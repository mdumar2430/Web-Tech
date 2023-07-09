import { createChatBotMessage, createClientMessage } from 'react-chatbot-kit';
import Button from 'react-bootstrap/Button'
const GotIt = (props) =>{
    const printGotIt = () => {
        const clientMessage = createClientMessage('Got it!');
        const botmessage = createChatBotMessage('Enter your Name',{delay:500})
        props.setState((prev) => ({
          ...prev,
          messages : [...prev.messages, clientMessage, botmessage]
        }));
    }
    return(
    <>
        <Button variant='success' size='sm' onClick={printGotIt}>
            Got it!
        </Button>
    </>
    )
}
export default GotIt;