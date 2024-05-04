import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Avatar, Flex } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import ChatLoading from "./ChatLoading";
import { getProfilepic, getSender } from "../config/ChatLogics";
import GroupChatModal from "./miscellaneous/GroupChatModal";

const MyChats = (fetchAgain) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="stretch"
      p={3}
      h="88%" // Ensure full height
      bg="linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%);"
      w={{ base: "100%", md: "31%" }}
      position="absolute"
      top="68px"
      bottom="30px"
      borderRadius="lg"
      borderWidth="3px"
    >
      <Box
        pb={2}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Nunito, sans-serif"
        d="flex"
        w="100%"
        bg="#524d9b -> #a8c0ff"
        // borderRadius="lg"
        // borderWidth="3px"
        // justifyContent="space-between"
        alignItems="center"
      >
        <GroupChatModal>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              CHATS
            </Box>
            <Button
              justifyContent="flex-end"
              fontFamily="Nunito, sans-serif"
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
              rightIcon={<AddIcon />}
              bgColor="#ffbd03"
            >
              New Group Chat
            </Button>
          </Box>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        mt={4}
        p={3}
        w="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack
            overflowY="auto"  // scrollbar functionality
            h="calc(100% - 40px)"
            fontFamily="Nunito, sans-serif"
          >
            {chats.map((chat) => (
              <Flex
                alignItems="center"
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Avatar
                  src={
                    !chat.isGroupChat
                      ? getProfilepic(loggedUser, chat.users)
                      : chat.chatName
                  }
                  size="sm"
                  mr={2}
                />
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Flex>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;