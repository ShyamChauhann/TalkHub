import React, { useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useToast } from "@chakra-ui/toast";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { Spinner } from "@chakra-ui/spinner";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import { getSender } from "../../config/ChatLogics";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false); // Initialize loadingChat with false
  const history = useHistory();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px"
        borderWidth="5px"
      >
        {/* Search User Button with Tooltip */}
        <Tooltip label="Search Users to chat" hasArrow placement='bottom-end'>
          <Button variant={"ghost"} bgColor={"lightblue"} onClick={onOpen} mr={4}>
            <i className="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          TalkHub
        </Text>

        {/* MenuButton and BellIcon at the right corner */}
        <Box>
          <Menu>
            <MenuButton as={Button} p={1} mr={4}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize={'2xl'} m="1" />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>

          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mr={4}>
              <Avatar size={"sm"} cursor={"pointer"} name={user.name} src={user.pic} />
            </MenuButton>
            {/* Dropdown Menu Items */}
            <MenuList>
              <ProfileModal user={user}>
                <Text fontWeight={"bold"}>----------- PROFILE -----------</Text>
                <MenuItem> {user.name}</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Flex direction={"column"} >
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch} mb={2} bgColor={"#1ad1ff"}>Go</Button>
            </Flex>
            {loading ? (
              <ChatLoading />
            ) : (
              <Flex direction="column">
                {searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))}
              </Flex>
            )}
            {loadingChat && <Spinner alignSelf="flex-end" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;