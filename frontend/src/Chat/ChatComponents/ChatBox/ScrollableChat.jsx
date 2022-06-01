import { Avatar } from '@chakra-ui/avatar';
import axios from 'axios';
import { Tooltip } from '@chakra-ui/tooltip';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import ScrollableFeed from 'react-scrollable-feed'
import { ChatState } from '../../../components/Context/ChatProvider';
import { isSameSender, isSameSenderMargin, isSameUser, isLastMessage } from './../Config/ChatLogic';
import Loader from '../../../components/Loader/Loader';




const ScrollableChat = forwardRef(({ messages, input, output }, ref) => {

   const { user } = ChatState();
   const [getData, setGetData] = useState(true);
   const [chatLoading, setChatLoading] = useState(false);
   

   let status = 0;
   let userId = JSON.parse(localStorage.getItem("userInfo"))._id; 

   // #157575 green
   // #EAD7C7
   useImperativeHandle(ref, () => ({


      traslateText() {
         // curl -X POST "https://libretranslate.com/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=nitn&source=en&target=es&format=text&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

         
         const params = new URLSearchParams();
       //  if (value == "first") {
            let i = 0;
            messages.map((item) => {
               setChatLoading(true);
               //   // console.log(item.content);
               if (getData && userId != item.sender._id) {
                  setGetData(false);
                  if (item.value != undefined && item.lang != output) {
                     i = i + 1;
                     params.delete('q');
                     params.append('q', item.content);
                     //  // console.log(input,output);
                     params.append('source', input);
                     params.append('target', output);
                     params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

                     axios.post('https://libretranslate.de/translate', params,
                        {
                           headers:
                           {
                              'accept': 'application/json',
                              'Content-Type': 'application/x-www-form-urlencoded'
                           }
                        }).then(res => {
                           status = res.status + status;
                           //   // console.log(res.status);
                           item["value"] = res.data.translatedText;
                           item["Lang"] = output;
                           if (i * 200 == status) {
                              //  // console.log('Translated')
                              setChatLoading(false);
                           }
                        })
                  } else if (item.value == undefined) {
                     i = i + 1;
                     params.delete('q');
                     params.append('q', item.content);
                     //  // console.log(input,output);
                     params.append('source', input);
                     params.append('target', output);
                     params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

                     axios.post('https://libretranslate.de/translate', params,
                        {
                           headers:
                           {
                              'accept': 'application/json',
                              'Content-Type': 'application/x-www-form-urlencoded'
                           }
                        }).then(res => {

                           status = res.status + status;
                           //   // console.log(res.status);
                           item["value"] = res.data.translatedText;
                           item["lang"] = output;
                           if (i * 200 == status) {
                              //  // console.log('Translated')
                              setChatLoading(false);
                           }
                        })
                  }
               }
            });

         setGetData(true);
      }
   }));






   return (
      <div style={{ marginBottom: "10px" }}>
         <ScrollableFeed>
            {chatLoading ? (
               <Loader></Loader>
            ) : (messages && messages.map((m, i) => (

               <div style={{ display: "flex" }} key={m._id}>
                  {

                     (isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id))
                     && (<Tooltip
                        label={m.sender.name}
                        placement="bottom-start"
                        hasArrow
                     >
                        <Avatar
                           mt="7px"
                           mr={1}
                           size="sm"
                           cursor="pointer"
                           name={m.sender.name}
                           src={m.sender.pic}
                        />
                     </Tooltip>)
                  }
                  <span
                     style={{
                        backgroundColor: `${m.sender._id === user._id ? "#fdf5d3" : "#323441"}`,
                        color: `${m.sender._id === user._id ? "black" : "white"}`,
                        fontFamily: "Montserrat",
                        fontWeight:500,
                        borderRadius: "10px",
                        fontSize: "14px",
                        padding: "10px 15px",
                        maxWidth: "75%",
                        marginLeft: isSameSenderMargin(messages, m, i, user._id),
                        marginTop: isSameUser(messages, m, i, user._id) ? 5 : 'auto',
                     }}
                  >{m.value ? m.value : m.content}</span>
               </div>
            )))}
         </ScrollableFeed>
      </div>
   )
});

export default ScrollableChat
