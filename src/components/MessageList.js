// src/components/MessageList.js
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { PiStarFourDuotone } from 'react-icons/pi';

// Styled Components
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto; /* Enable vertical scrolling */
  padding: 16px;
`;

const BotActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  row-gap: 0px;
  column-gap: 8px;
  margin: 5px 0;
  
  /* Added Styles */
  padding: 4px 10px; /* Adds space inside the grid */
  border: 2px solid ${(props) => props.theme.colors.border || '#ccc'}; /* Defines the border */
  border-radius: 8px; /* Rounds the corners of the border */
  background-color: ${(props) => props.theme.colors.botActionsBg || '#f0f0f0'}; /* Sets a background color */
  
  /* Optional: Add a subtle box-shadow for depth */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 4px; /* Adjust padding for smaller screens */
    border-width: 1px; /* Thinner border on mobile */
  }
`;

// Styled Component for GridHeader
const GridHeader = styled.div`
  grid-column: 1 / -1; /* Span all columns */
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.messageMetadataText};
`;

// Styled Component for ActionIcon
const ActionIcon = styled.span`
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
  
  /* Example using react-icons */
  svg {
    width: 16px;
    height: 16px;
    color: ${(props) => props.theme.colors.botActionMessageText};
  }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
`;

const MessageBubble = styled.div`
  max-width: 100%;
  padding: 10px 16px;
  margin: 8px 0;
  border-radius: ${(props) => (props.sender === 'bot-action' ? '8px' : '20px')}; /* Less rounded for bot-action */
  border: 2px solid ${(props) => props.sender === 'bot-action' ? props.theme.colors.botActionMessageBgHover || '#ccc' : 'transparent'}; 
  background-color: ${(props) =>
    props.sender === 'user' ? props.theme.colors.userMessageBg : 
    props.sender === 'bot-action' ? props.theme.colors.botActionMessageBg :
    props.theme.colors.botMessageBg};
  color: ${(props) =>
    props.sender === 'user' ? props.theme.colors.userMessageText : 
    props.sender === 'bot-action' ? props.theme.colors.botActionMessageText :
    props.theme.colors.botMessageText};
  align-self: ${(props) => (props.sender === 'user' ? 'flex-end' : 'flex-start')};
  word-wrap: break-word;
  cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  /* Hover effect for clickable messages */
  &:hover {
    background-color: ${(props) =>
      props.clickable
        ? props.sender === 'user'
          ? props.theme.colors.userMessageBgHover
          : props.sender === 'bot-action'
            ? props.theme.colors.botActionMessageBgHover
            : props.theme.colors.botMessageBgHover
        : props.sender === 'user'
          ? props.theme.colors.userMessageBg
          : props.theme.colors.botMessageBg};
  }

  /* Ensure bot-action messages fill the grid cell */
  ${(props) => props.sender === 'bot-action' && `
    width: 100%;
    box-sizing: border-box;
  `}
`;

const MessageMetadata = styled.div`
  max-width: 70%;
  padding: 0px 10px;
  margin: 0px 0;
  align-self: ${(props) => (props.sender === 'user' ? 'flex-end' : 'flex-start')};
  word-wrap: break-word;
  font-size: 0.7rem;
  color: ${(props) => props.theme.colors.messageMetadataText};
`;

// Helper function to group messages
const groupMessages = (messages) => {
  const grouped = [];
  let botActionGroup = [];

  messages.forEach((msg, index) => {
    if (!msg || !msg.sender) {
      console.warn(`Message at index ${index} is invalid:`, msg);
      return; // Skip invalid messages
    }

    if (msg.sender === 'bot-action') {
      botActionGroup.push(msg);
    } else {
      if (botActionGroup.length > 0) {
        grouped.push({ type: 'bot-action-group', messages: botActionGroup });
        botActionGroup = [];
      }
      grouped.push({ type: 'regular', message: msg });
    }
  });

  // Push any remaining bot-action messages
  if (botActionGroup.length > 0) {
    grouped.push({ type: 'bot-action-group', messages: botActionGroup });
  }

  return grouped;
};

function MessageList({ messages, onActionClick }) {
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Click handler for bot-action messages
  const handleBotActionClick = (link) => {
    console.log('Bot action clicked:', link);

    if (onActionClick && link) {
      onActionClick(link);
    }
  };

  // Group messages
  const groupedMessages = groupMessages(messages);

  return (
    <ListContainer>
      {groupedMessages.map((group, index) => {
        if (group.type === 'regular') {
          const message = group.message;
          return (
            <MessageContainer key={message.id}>
              <MessageBubble
                sender={message.sender}
                clickable={message.sender === 'bot-action'}
                onClick={() => {
                  if (message.sender === 'bot-action') {
                    handleBotActionClick(message.link);
                  }
                }}
                title={message.sender === 'bot-action' ? message.description : undefined}
                role={message.sender === 'bot-action' ? 'button' : 'text'}
                aria-label={message.sender === 'bot-action' ? 'Bot action message. ' + message.description : undefined}
              >
                {message.text}
              </MessageBubble>
              <MessageMetadata sender={message.sender}>
                {message.sender} {message.date ? "- " + message.date : ""}
              </MessageMetadata>
            </MessageContainer>
          );
        } else if (group.type === 'bot-action-group') {
          return (
            <BotActionsGrid key={`bot-action-group-${index}`}>
              {/* <GridHeader>Recommended Actions</GridHeader> */}
              {group.messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  sender={message.sender}
                  clickable={true}
                  onClick={() => handleBotActionClick(message.link)}
                  title={message.description}
                  role="button"
                  aria-pressed="false"
                  aria-label={'Bot action message. ' + message.description}
                >
                  {/* <ActionIcon>
                    <PiStarFourDuotone />
                  </ActionIcon> */}
                  {message.text}
                </MessageBubble>
              ))}
            </BotActionsGrid>
          );
        } else {
          return null;
        }
      })}
      <div ref={messagesEndRef} />
    </ListContainer>
  );
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // Ensure each message has an id
      sender: PropTypes.oneOf(['user', 'bot', 'bot-action']).isRequired,
      date: PropTypes.string,
      text: PropTypes.string.isRequired,
      context: PropTypes.string,
      link: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
  onActionClick: PropTypes.func, // Function to handle bot-action clicks
};

export default MessageList;