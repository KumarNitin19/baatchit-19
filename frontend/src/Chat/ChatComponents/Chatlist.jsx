import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import GroupChatModal from "./GroupChatModal";
import { Avatar, Button } from "@chakra-ui/react";
import { getSender } from "./Config/ChatLogic";
import Loader from "../../components/Loader/Loader";
import { ChatState } from "../../components/Context/ChatProvider";
import './Chatlist.css'

const ChatList = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // // console.log(user._id);
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
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      pt={3}
      px={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      background="black"
      color="#fdf5d3"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "22px" }}
        fontFamily="Oswald"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        fontWeight="500"
      >
        My Chats
        {/* <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "10px", md: "7px", lg: "11px" }}
            className="groupButton"
            rightIcon={<AddIcon />}
            bg="#393f93"
            color="white"
            fontFamily="Montserrat"
          >
            New Group Chat
          </Button>
        </GroupChatModal> */}
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        my={3}
        bg="#474747"
        color="black"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (

              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#fdf5d3" : "black"}
                color={selectedChat === chat ? "black" : "#fdf5d3" }
                p={3}
                borderRadius="lg"
                key={chat._id}
                className="chatListBox"
              >
                  <Text  fontFamily="Oswald">
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  {chat.latestMessage && (
                    <Text fontSize="xs" fontFamily="Montserrat" fontWeight="500">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )}
              </Box>
            ))}
          </Stack>
        ) : (
          <Loader></Loader>
        )}
      </Box>
    </Box>
  );
};

export default ChatList;