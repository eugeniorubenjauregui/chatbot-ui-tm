"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import apiService from "../services/apiService"
import "./Chatbot.css"

const Chatbot = ({ userToken, userId }) => {
  const { t } = useTranslation()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const chatboxRef = useRef(null)

  useEffect(() => {
    // Scroll to bottom on new message
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight
    }

    const handleUserMessage = async () => {
      if (messages.length === 0) return

      const lastMessage = messages[messages.length - 1]
      console.log("lastMessage", lastMessage)

      // Only respond if last message is from user
      if (lastMessage.sender === "user") {
        if (lastMessage) {
          try {
            const response = await apiService.callLLMService(lastMessage.text, userToken, userId, lastMessage.context)

            if (response) {
              const parsedResponse = JSON.parse(response)

              // Check if this is a recipe request
              if (
                parsedResponse.UserMessage &&
                Array.isArray(parsedResponse.UserMessage) &&
                parsedResponse.UserMessage.length > 0 &&
                parsedResponse.UserMessage[0].name_of_action_to_take === "RequestRecipe"
              ) {
                // Extract the recipe item
                const recipeItem = parsedResponse.UserMessage[0].item_to_act_on

                // Add initial response message
                addMessage("bot", `Looking for a recipe for ${recipeItem}...`)

                try {
                  // Fetch recipe from the recipe service
                  const recipeResponse = await apiService.fetchRecipe(recipeItem)

                  if (recipeResponse && recipeResponse.recipes && recipeResponse.recipes.length > 0) {
                    const recipe = recipeResponse.recipes[0]

                    // Format and display the recipe
                    const recipeText = formatRecipe(recipe)
                    addMessage("bot", recipeText)
                  } else {
                    addMessage("bot", `Sorry, I couldn't find a recipe for ${recipeItem}.`)
                  }
                } catch (recipeError) {
                  console.error("Error fetching recipe:", recipeError)
                  addMessage("bot", "Sorry, there was an error fetching the recipe. Please try again later.")
                }
              } else if (parsedResponse.Response) {
                // Handle normal responses
                addMessage("bot", t("You said: ") + lastMessage.text)
                if (Array.isArray(parsedResponse.Response)) {
                  parsedResponse.Response.forEach((action) => {
                    addMessage("bot", action.action_name || action.action_ame, action.action_description)
                  })
                } else if (parsedResponse.Response.action_type) {
                  // Handle single action response
                  addMessage("bot", parsedResponse.Response.action_type, parsedResponse.Response.action_description)
                }
              }
            }
          } catch (error) {
            console.error("Error calling LLM service:", error)
            addMessage("bot", "Sorry, I encountered an error processing your request.")
          }
        } else {
          // Echo message
          addMessage("bot", t("You said: ") + lastMessage.text)
        }
      }
    }

    handleUserMessage()
  }, [messages, userToken, userId, t])

  const addMessage = (sender, text, context = null) => {
    setMessages((prevMessages) => [...prevMessages, { sender, text, context }])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    addMessage("user", input)
    setInput("")
  }

  // Add this helper function to format the recipe nicely
  const formatRecipe = (recipe) => {
    let formattedRecipe = `## ${recipe.name}\n\n`
    formattedRecipe += `${recipe.description}\n\n`

    formattedRecipe += `**Preparation Time:** ${recipe.prepTimeMinutes} minutes\n`
    formattedRecipe += `**Cooking Time:** ${recipe.cookTimeMinutes} minutes\n`
    formattedRecipe += `**Total Time:** ${recipe.totalTimeMinutes} minutes\n\n`

    formattedRecipe += `**Ingredients:**\n`
    recipe.ingredients.forEach((ingredient) => {
      formattedRecipe += `- ${ingredient.quantity} ${ingredient.unit} ${ingredient.name}${ingredient.preparation ? ` (${ingredient.preparation})` : ""}\n`
    })

    formattedRecipe += `\n**Instructions:**\n`
    recipe.instructions.forEach((instruction, index) => {
      formattedRecipe += `${index + 1}. ${instruction}\n`
    })

    formattedRecipe += `\n**Dietary Information:** ${recipe.dietaryPreferences.join(", ")}`

    return formattedRecipe
  }

  return (
    <div className="chatbot-container">
      <div className="chatbox" ref={chatboxRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === "user" ? "user" : "bot"}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("Type your message...")}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  )
}

export default Chatbot
