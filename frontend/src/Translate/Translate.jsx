
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Translate.css';


const Translate = () => {

    const [options, setOptions] = useState([]);
    const [to, setTo] = useState('en');
    const [from, setFrom] = useState('en');
    const [inputText, setInputText] = useState('');
    const [onputText, setOnputText] = useState('');
    const [getData, setGetData] = useState(true);

    const data = [
        {
            name: "Hey"
        },
         {
            name: "How are you?"
        },
         {
            name: "I am fine"
        },
        {
            name: "What about you"
        },
        {
            name: "I am also fine"
        },
        {
            name: "Okay"
        },
        {
            name: "Bye"
        }
    ]

    const traslateText = () => {
        // curl -X POST "https://libretranslate.com/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=nitn&source=en&target=es&format=text&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

        const params = new URLSearchParams();
        let output = [];
        data.map((item) => {

            if (getData) {
                setGetData(false);
                params.delete('q');
                params.append('q', item.name);
                params.append('source', from);
                params.append('target', to);
                params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

                 axios.post('https://libretranslate.de/translate', params,
                    {
                        headers:
                        {
                            'accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(res => {
                        output.push(res.data);
                        // output = output.reverse()
                        // // console.log( item.name ,' = ' ,res.data);
                        // console.log(output);
                         setOnputText(
                            output.map((result) => {
                                return result.translatedText;
                            })
                        );
                    })
            }
            setGetData(true);
        })
    }

    useEffect(() => {
        axios.get('https://libretranslate.com/languages',
            {
                headers: { 'accept': 'application/json' }
            }).then(res => {
                setOptions(res.data)
                // console.log(res.data);
            })
    }, [])

    // curl -X GET "https://libretranslate.com/languages" -H  "accept: application/json"


    return (
        <div className="mainContainer">
            <div className="selectContainer">From: {from}
                <select className="select" onChange={(e) => setFrom(e.target.value)}>
                    {options.map(function (a) {
                        return (
                            <option key={a.code} value={a.code}>{a.name}</option>
                        );
                    })}
                </select>
            </div>
            <textarea cols="30" rows="10" className="textArea" onInput={(e) => setInputText(e.target.value)}></textarea>
            <div className="selectContainer">To: {to}
                <select className="select" onChange={(e) => setTo(e.target.value)}> To:
                                    {options.map(function (a) {
                    return (
                        <option key={a.code} value={a.code}>{a.name}</option>
                    );
                })}
                </select>
            </div>
            <textarea cols="30" rows="10" className="textArea" value={onputText}></textarea>
            <button className="button" onClick={traslateText} >Translate</button>
        </div>
    )
}

export default Translate
