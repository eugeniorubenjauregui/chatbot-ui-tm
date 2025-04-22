// src/components/MessageInput.js
import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components'; // Import 'css' here
import { FaPaperPlane, FaList } from 'react-icons/fa'; // Icons for send and toggle
import PropTypes from 'prop-types';
import QuickChatPopup from './QuickChatPopup';

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background-color: ${(props) => props.theme.colors.inputBackground};
  border-top: 1px solid #ccc;
`;

const ToggleMessageListButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.7;
  }

  &:focus {
    outline: none;
  }

  /* Adjust margin based on RTL/LTR */
  ${(props) =>
    props.$isRTL
      ? css`
          margin-right: 8px;
          margin-left: 8px
        `
      : css`
          margin-left: 8px;
          margin-right: 8px;
        `}
`;

const TextInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: ${(props) => props.theme.fonts.main};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }

  /* Adjust text alignment based on RTL/LTR */
  text-align: ${(props) => (props.$isRTL ? 'right' : 'left')};
`;

// Styled textarea for message input
const Textarea = styled.textarea`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: ${(props) => props.theme.fonts.main};
  font-size: 1rem;
  resize: none; /* Disable manual resizing */
  overflow: hidden; /* Hide scrollbar */
  min-height: 40px; /* Minimum height for one line */
  max-height: 200px; /* Maximum height before scrolling */
  line-height: 1.5;
  transition: height 0.2s ease; /* Smooth transition for height changes */

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }

  /* Adjust text alignment based on RTL/LTR */
  text-align: ${(props) => (props.$isRTL ? 'right' : 'left')};
`;

const SendButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.textLight};
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.9;
  }

  &:focus {
    outline: none;
  }

  /* Adjust margin based on RTL/LTR */
  ${(props) =>
    props.$isRTL
      ? css`
          margin-left: 8px;
        `
      : css`
          margin-right: 8px;
        `}
`;

function MessageInput({ 
  addMessage, 
  isRTL = false, 
  toggleMessageList, 
  setIsMessageListVisible,
  incomingContext,
  activeTab, 
  onSetActiveTab
 }) { 
  const [inputValue, setInputValue] = useState('');
  const [isQuickChatOpen, setIsQuickChatOpen] = useState(false); // State for QuickChatPopup
  const textareaRef = useRef(null); // Reference to the textarea

  // If you want to dynamically adjust promptOptions based on context
  const [promptOptions, setPromptOptions] = useState([
    {
      title: 'How are you?',
      description: 'Ask how the bot is doing',
      autoSend: true,
    },
    {
      title: 'Generate a recipe for _',
      description: 'Ask the bot to generate a recipe',
      autoSend: false,
    },
    {
      title: 'Generate a meal plan for _ people for _ days for dinner only. \nWe like _ and _, and we dislike _.',
      description: 'Ask the bot for a meal plan',
      autoSend: false,
    },
    {
      title: 'Help',
      description: 'Ask the bot for help',
      autoSend: true,
    },
  ]);

  // Watch for new incomingContext and modify prompt options (or other logic)
  useEffect(() => {
    if (!incomingContext) return;

    console.log('MessageInput sees new context:', incomingContext);

    // Make sure the chat overlay panel is visible
    setIsMessageListVisible(true);

    // Example: If pageType === 'productDetailPage', add a new quick prompt
    if (incomingContext.pageType === 'productDetailPage') {
      // Just an example of modifying the promptOptions
      // setPromptOptions((prev) => [
      //   ...prev,
      //   {
      //     title: `Tell me more about ${incomingContext.name}`,
      //     description: 'Ask for product details',
      //     autoSend: true,
      //   },
      // ]);
      addMessage('user', `Tell me more about the Product: ${incomingContext.name}`, `Product-releated actions you can take`, incomingContext);
    } 
    else if (incomingContext.pageType === 'categoryDetailPage') {
      // Just an example of modifying the promptOptions
      // setPromptOptions((prev) => [
      //   ...prev,
      //   {
      //     title: `Tell me more about ${incomingContext.catalogCategory}`,
      //     description: 'Ask for product details',
      //     autoSend: true,
      //   },
      // ]);
      addMessage('user', `Tell me more about the Category: ${incomingContext.name}`, `Category-releated actions you can take`, incomingContext);
    }

    // Or if pageType === 'searchResultsPage', maybe add a "Refine search" prompt, etc.
    if (incomingContext.pageType === 'searchResultsPage') {
      // setPromptOptions((prev) => [
      //   ...prev,
      //   {
      //     title: `Refine my search for ${incomingContext.catalogContext}`,
      //     description: 'Narrow down the results',
      //     autoSend: true,
      //   },
      // ]);
      addMessage('user', `Tell me more about Search Results for: ${incomingContext.name}`, `Search-releated actions you can take`, incomingContext);
    }

    // You can incorporate logic to avoid duplicating prompts or reset them
    // For demonstration, we’re just pushing more items
  }, [incomingContext]);


  // Function to handle sending messages
  const handleSend = () => {
    if (inputValue.trim() === '') return;
    addMessage('user', inputValue.trim());
    setInputValue('');
    setIsMessageListVisible(true); // Open the message list when sending a message
  };

  // Function to handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent newline insertion
      handleSend();
    } else if (e.key === 'Escape') {
      setIsMessageListVisible(false); 
    }
  };

  const onPromptSelect = (prompt) => {
    if (prompt.autoSend) {
      addMessage('user', prompt.title);
      setInputValue('');
    } else {
      setInputValue(prompt.title);
    }
    setIsMessageListVisible(true); // Open the message list when selecting a prompt
  }

  // Function to adjust textarea height for auto-resizing
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to scrollHeight
    }
  };

  // Adjust textarea height whenever inputValue changes
  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  return (
    <InputContainer>
      {/* QuickChatPopup Activation Button */}
      <QuickChatPopup
        activeTab={activeTab}
        setActiveTab={onSetActiveTab}
      />

      {/* Toggle Message List Button */}
      <ToggleMessageListButton
        onClick={toggleMessageList}
        aria-label={isRTL ? 'إظهار الرسائل' : 'Toggle Messages'}
        $isRTL={isRTL}
      >
        <FaList />
      </ToggleMessageListButton>

      {/* Text Input Field as Textarea */}
      <Textarea
        placeholder={isRTL ? 'اكتب رسالتك...' : 'Type your message...'}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        dir={isRTL ? 'rtl' : 'ltr'}
        $isRTL={isRTL}
        ref={textareaRef}
        rows={1} // Start with one row
      />

      <SendButton
        onClick={handleSend}
        aria-label={isRTL ? 'إرسال الرسالة' : 'Send Message'}
        $isRTL={isRTL} // Pass isRTL prop for styling
      >
        <FaPaperPlane />
      </SendButton>
    </InputContainer>
  );
}

MessageInput.propTypes = {
  addMessage: PropTypes.func.isRequired,
  isRTL: PropTypes.bool,
  toggleMessageList: PropTypes.func.isRequired,
  setIsMessageListVisible: PropTypes.func.isRequired,
  incomingContext: PropTypes.object,
};

export default MessageInput;