import { Button } from '@chakra-ui/button'
import { FormControl } from '@chakra-ui/form-control'
import { useDisclosure } from '@chakra-ui/hooks'
import { Input } from '@chakra-ui/input'
import { Box } from '@chakra-ui/layout'
import { ModalOverlay } from '@chakra-ui/modal'
import { ModalHeader } from '@chakra-ui/modal'
import { ModalBody } from '@chakra-ui/modal'
import { ModalFooter } from '@chakra-ui/modal'
import { ModalCloseButton } from '@chakra-ui/modal'
import { ModalContent } from '@chakra-ui/modal'
import { Modal } from '@chakra-ui/modal'
import { useToast } from '@chakra-ui/toast'
import axios from 'axios'
import React, { useState } from 'react'
import { ChatState } from '../../components/Context/ChatProvider'
import UserBadgeItem from '../../components/User Avatar/UserBadgeItem'
import UserListItem from '../../components/User Avatar/UserListItem'
import Chatlist from './Chatlist'

const GroupChatModal = ({children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ groupChatName, setGroupChatName] = useState();
    const [selectedUser, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const toast = useToast();
    const {user,chats,setChats} = ChatState();


    const handleSearch = async(query) =>{
                setSearch(query);
                if(!query){
                    return;
                }
                try {
                    setLoading(true);
                    const config ={
                        headers: {
                            Authorization:`Bearer ${user.token}`,
                        },
                    };
                    const {data} = await axios.get(`/api/user?search=${search}`,config);
                    // console.log(data);
                    setSearchResult(data);
                    setLoading(false);
                } catch (error) {
                    toast({
                        title:"Error Occured",
                        description:"Failed to load the search result!!",
                        status:"warning",
                        duration:5000,
                        isClosable:true,
                        position:"bottom-left"
                    });
                }
    }

    const handleSubmit = async(value) =>{
                if(!groupChatName || !selectedUser){
                    toast({
                        title:"Please Fill all the Feilds",
                        status:"warning",
                        duration:5000,
                        isClosable:true,
                        position:"bottom-left"
                    });
                    return;
                }
            
                try {
                    const config ={
                        headers: {
                            Authorization:`Bearer ${user.token}`,
                        },
                    };
                    const { data } = await axios.post('/api/chat/group',{
                        name: groupChatName,
                        users: JSON.stringify(selectedUser.map((u)=>u._id))
                    },config);
                    setChats([data,...chats]);
                    onClose();
                    toast({
                        title:"New Group Chat Created ;-)",
                        status:"success",
                        duration:5000,
                        isClosable:true,
                        position:"bottom-left"
                    });
                } catch (error) {
                    toast({
                        title:"Failed to create the Group :-(",
                        status:"warning",
                        duration:5000,
                        isClosable:true,
                        position:"bottom-left"
                    });
                }
    } 


    const handleGroup = (userToAdd) =>{
             if(selectedUser.includes(userToAdd)){
                toast({
                    title:"User Already Added",
                    status:"warning",
                    duration:5000,
                    isClosable:true,
                    position:"bottom-left"
                });
                return;
             }  
             setSelectedUsers([...selectedUser,userToAdd]);
    }


    const handleDelete = (delUser) =>{
                setSelectedUsers(
                    selectedUser.filter((sel)=>sel._id !== delUser._id)
                    );
    }


    return (
        <>
            
            <span onClick={onOpen}>{children}</span>

                <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                       fontSize="35px"
                       fontFamily="roboto"
                       d="flex"
                       justifyContent="center"
                    >Create Group Chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody d="flex" flexDirection="column" alignItems="center">
                          <FormControl>
                              <Input 
                              placeholder="Chat Name"
                              mb={3} 
                              onChange={(e)=>setGroupChatName(e.target.value)}
                              />
                          </FormControl>
                          <FormControl>
                              <Input 
                              placeholder="Add Users"
                              mb={1} 
                              onChange={(e)=>handleSearch(e.target.value)}
                              />
                          </FormControl>
                           <Box w="100%" d="flex" flexWrap="wrap">
                                {selectedUser.map(u=>(
                                    <UserBadgeItem
                                        key={u._id}
                                        user={u}
                                        handleFunction={()=>handleDelete(u)}
                                    ></UserBadgeItem>
                                ))}
                           </Box>

                          {loading ? (<div>Loading</div>) :
                           (searchResult?.slice(0,4).map(user=>(
                               <UserListItem
                                  key={user._id}
                                  user={user}
                                  handleFunction={()=>handleGroup(user)} >
                               </UserListItem>
                           ))
                           )}
                    </ModalBody>
                    <ModalFooter>
                    <Button colorScheme='blue' onClick={handleSubmit}>
                        Create Chat
                    </Button>
                    </ModalFooter>
                </ModalContent>
                </Modal>

        </>
    )
}

export default GroupChatModal
