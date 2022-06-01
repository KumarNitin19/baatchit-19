import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { VStack } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'
import React, { useState } from 'react'
import axios from 'axios'
import { useHistory} from "react-router";



const Login = () => {
 
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [show, setShow] = useState(false); 
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const history = useHistory();

    


    const showText = () => {
        setShow(!show);
    }

    const submitHandler = async () => { 
    
        setLoading(true);
        if(!email || !password ){
            toast({
                title: 'Please Fill all the fields*',
                status: 'warning',
                duration: 2000,
                isClosable: true,
                position:"top",
              });
              setLoading(false);
              return;
        }
        try {
            const config = {
                headers:{
                    "Content-type":"application/json",
                },
            };
            const {data} = await axios.post('/api/user/login',{email,password},config);
            toast({
                title: 'Login Successful',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position:"top",
              });
             console.log(data);
            
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push("/chats");
            window.location.reload();

        } catch (error) {
            toast({
                title: 'Login Fail',
                description:"Email or Password is incorrect",
                status: 'warning',
                duration: 2000,
                isClosable: true,
                position:"top",
              });
        }
    }


    return (
        <VStack spacing="5px" color="black">
             <FormControl isRequired>
                 <FormLabel>Email</FormLabel>
                 <Input 
                     placeholder="Enter Your Email"
                     className="inputBox"
                     onChange={(e)=>setEmail(e.target.value)}
                     borderRadius="8px"
                     ></Input>
             </FormControl>
             <FormControl isRequired>
                 <FormLabel>Password</FormLabel>
                 <InputGroup>
                    <Input 
                        type={ show? "text" :"password"}
                        className="inputBox"
                        placeholder="Enter Passoword"
                        onChange={(e)=>setPassword(e.target.value)}
                        borderRadius="8px"
                        ></Input>
                        <InputRightElement width="4.5rem">
                            <Button className="blackButton" h="1.75rem" size="sm" onClick={showText}>
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                  </InputGroup>
             </FormControl>
             <Button 
             className="blackButton"
             width="100%"
             style={{marginTop:15}}
             onClick={submitHandler}
             >
                 Log-In
             </Button>
        </VStack>
    )
}

export default Login
