import React, {useState} from 'react';
import { Form, Container } from 'react-bootstrap';
import { createChatBotMessage, createClientMessage } from 'react-chatbot-kit';
import { setStudentAge } from '../action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const AgeSelector = (props) =>{
    const [show, setShow] = useState(true)
    const nav = useNavigate();
    const dispatch = useDispatch();
    const ageOptions =  Array.from({ length: 23 }, (_, index) => 18 + index);
    const handleAgeSelection = (e) =>{
        const age = e.target.value
        const clientMessage = createClientMessage(age+"",{delay:500});
        props.setState((prev) => ({
          ...prev,
          messages : [...prev.messages, clientMessage]
        }));
        dispatch(setStudentAge(age))
        setShow(false)
        const botMessage = createChatBotMessage('Thank you. In 5 seconds, bot will exit',{delay:500})
        props.setState((prev) => ({
            ...prev,
            messages : [...prev.messages, botMessage]
        }));
        
        setTimeout(()=>{
            nav("/success")
        }, 5000)
        
    }
    return(
        <>
        {show&&
        <Container>
            <Form.Select 
            size="sm" 
            style={{ height: '30px', overflowY: 'scroll' , width: '60px'}}
            onChange={handleAgeSelection}>
                {ageOptions.map((age) => (
                <option key={age} value={age}>
                    {age}
                </option>
                ))}
            </Form.Select>
        </Container>}
        
        </>
    )
}
export default AgeSelector;