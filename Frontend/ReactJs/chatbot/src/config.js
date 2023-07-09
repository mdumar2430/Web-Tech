import { createChatBotMessage } from 'react-chatbot-kit';
import GotIt from './components/GotIt';
import AgeSelector from './components/AgeSelector';
const config = {
  initialMessages: [createChatBotMessage(`Hello, Welcome to student info system!`
      ,{
        withAvatar: true,
        delay: 500,
        widget: "gotIt",
      }
  )],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
  widgets : [
    {
      widgetName: "gotIt",
      widgetFunc: (props) => <GotIt {...props} />,
    },
    {
      widgetName: "ageSelector",
      widgetFunc: (props) => <AgeSelector {...props} />,
    },
  ]
};

export default config;