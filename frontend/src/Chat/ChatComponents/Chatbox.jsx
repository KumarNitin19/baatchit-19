import { Box } from '@chakra-ui/layout';
import React from 'react';
import { ChatState } from '../../components/Context/ChatProvider';
import SingleChat from './ChatBox/SingleChat';
import './Chatbox.css'


const Chatbox = ({fetchAgain, setFetchAgain}) => {

   const {selectedChat} = ChatState();

    return (
       <Box 
         d={{base: selectedChat ? "flex" : "none" , md: "flex"}}
         alignItems="center"
         flexDir="column"
         p={3}
         w={{ base:"100%" , md:"68%"}}
         borderRadius="lg"
         className="chatListBackground"
       >
         <SingleChat  fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} ></SingleChat>
       </Box>
    )
}

export default Chatbox
