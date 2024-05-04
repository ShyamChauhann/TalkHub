import { useState, useEffect, useRef } from 'react'; // Import useState, useEffect, and useRef
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  const chatContainerRef = useRef(null); // Create a ref for the chat container
  const [scrollButtonVisible, setScrollButtonVisible] = useState(false); // State to track scroll button visibility

  // Scroll to the bottom of the chat container
  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  // Check if scroll is at the bottom, and update scroll button visibility accordingly
  const handleScroll = () => {
    if (
      chatContainerRef.current.scrollHeight - chatContainerRef.current.scrollTop ===
      chatContainerRef.current.clientHeight
    ) {
      setScrollButtonVisible(false);
    } else {
      setScrollButtonVisible(true);
    }
  };

  useEffect(() => {
    // Initial check for scroll button visibility
    handleScroll();
  }, [messages]); // Re-check visibility when messages change

  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={chatContainerRef}
        style={{
          maxHeight: '150px', // Adjust height as needed
          overflowY: 'auto',
          marginBottom: '30px', // Space for the scroll button
        }}
        onScroll={handleScroll}
      >
        <ScrollableFeed>
          {messages &&
            messages.map((m, i) => (
              <div style={{ display: "flex" }} key={m._id}>
                {(isSameSender(messages, m, i, user._id) ||
                  isLastMessage(messages, i, user._id)) && (
                    <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                      <Avatar
                        mt="7px"
                        mr={1}
                        size="sm"
                        cursor="pointer"
                        name={m.sender.name}
                        src={m.sender.pic}
                      />
                    </Tooltip>
                  )}
                <span
                  style={{
                    backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                      }`,
                    marginLeft: isSameSenderMargin(messages, m, i, user._id),
                    marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                    borderRadius: "20px",
                    padding: "5px 15px",
                    maxWidth: "75%",
                  }}
                >
                  {m.content}
                </span>
              </div>
            ))}
        </ScrollableFeed>
      </div>
      {scrollButtonVisible && ( // Render scroll button if visible
        <button
          style={{
            position: 'absolute',
            bottom: '0',
            right: '10px',
          }}
          onClick={scrollToBottom}
        >
          Scroll to Bottom
        </button>
      )}
    </div>
  );
};

export default ScrollableChat;
