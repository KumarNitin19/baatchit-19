import { Container,Box, Text } from '@chakra-ui/layout';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import React from 'react'
import './Auth.css'
import Login from './Login/Login';
import Signup from './Signup/Signup';

function Auth() {
    return (
        <Container maxW="xl" centerContent>
           <Box
           d="flex"
           justifyContent="center"
           p={3}
           background={"black"}
           color={"#fdf5d3"}
           w="100%"
           m="70px 0 20px 0"
           borderRadius="lg"
           borderWidth="0px"
           >
               <Text className="loginHeading font-heading" d="flex" color="#fdf5d3" >Baat-Chit <img src="assets/logo.png" className="logoImage" /></Text>
           </Box>
           <Box bg="#fdf5d3" w="100%" p={4} borderRadius="lg" borderWidth="1px">
           <Tabs variant='soft-rounded' >
                <TabList mb="1em">
                    <Tab className="authButton" width="50%" borderWidth="2px" borderColor="black" outline="none" boxShadow="none" mr="5px">Login</Tab>
                    <Tab  className="authButton" width="50%" borderWidth="2px" borderColor="black"  outline="none" boxShadow="none"  ml="5px">Signup</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                       <Login></Login>
                    </TabPanel>
                    <TabPanel>
                        <Signup></Signup>
                    </TabPanel>
                </TabPanels>
                </Tabs>
           </Box>
        </Container>
    )
}

export default Auth
