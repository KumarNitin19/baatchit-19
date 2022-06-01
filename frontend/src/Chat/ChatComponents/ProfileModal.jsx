import { Button, IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { ViewIcon } from '@chakra-ui/icons'
import { Image } from '@chakra-ui/image'
import { Text } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import React from 'react'

const ProfileModal = ({user, children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    let country = JSON.parse(localStorage.getItem("userInfo")).country;
    let language = JSON.parse(localStorage.getItem("userInfo")).language;
     // console.log(user);
    return (
        <>
            {
          children ? (<span onClick={onOpen}> {children}</span>) :
             (
               <IconButton
                  d={{base:"flex"}} 
                  icon={<ViewIcon></ViewIcon>}
                  onClick={onOpen}
                  background="black"
                  color="#fdf5d3"
                  >
               </IconButton>
           )}



            <Modal size="lg"  isOpen={isOpen} onClose={onClose} isCentered className="modalBody">
        <ModalOverlay />
        <ModalContent >
          <ModalHeader
            fontSize="40px"
            fontFamily="Oswald"
            d="flex"
            justifyContent="left"
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
             d="flex"
             flexDir="column"
            
          >
              <Image
                 borderRadius="full"
                 boxSize="150px"
                 src={user.pic}
                 alt="user pic"
                 margin="auto"
              />
              <Text
                  fontSize={{base:"28px", md:"20px"}}
                  fontFamily="Montserrat"
                  mt="4"  
                  textAlign="start"
                  fontWeight="600"
              >Username :- {user.email}</Text>
              <Text
                  fontSize={{base:"15px", md:"15px"}}
                  fontFamily="Montserrat"
                  textAlign="start"
                  mt="2"
                  fontWeight="500"   
              ><i class="fa fa-map-marker" aria-hidden="true"></i> &nbsp; {user.country}</Text>
              <Text
                  fontSize={{base:"15px", md:"15px"}}
                  fontFamily="Montserrat"
                  textAlign="start"  
                  mt="2" 
                  fontWeight="500"
              ><i class="fa fa-globe" aria-hidden="true"></i>&nbsp; {user.language}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose} background="black" color="#fdf5d3">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> 
        </>
    )
}

export default ProfileModal
