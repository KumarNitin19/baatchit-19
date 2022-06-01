import React, { useState } from 'react';
import { Box } from "@chakra-ui/layout";
import SideDrawer from "./ChatComponents/SideDrawer";
import Chatlist from './ChatComponents/Chatlist';
import Chatbox from './ChatComponents/Chatbox';
import { ChatState } from '../components/Context/ChatProvider';


function Chat() {
    
   const { user } = ChatState(); 
   const [fetchAgain, setFetchAgain] = useState(false)
 
    return(
        <div style={{width:"100%"}}>
            {user && <SideDrawer />}
            <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px"> 
                {/* {user && <Chatlist />}
                {user && <Chatbox />} */}
                {user && (<Chatlist fetchAgain={fetchAgain}></Chatlist> ) }
                {user && (<Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}></Chatbox> )}
            </Box>  
        </div>
    );
}

export default Chat
