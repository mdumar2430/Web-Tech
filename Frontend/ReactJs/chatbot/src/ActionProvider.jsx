import React from 'react';
import { useDispatch } from 'react-redux';
import { setStudentName } from './action';
const ActionProvider = (props) => {
  const dispatch = useDispatch();
  const saveStudentName = (name) =>{
    dispatch(setStudentName(name))
    const botmsg = props.createChatBotMessage('Enter your age',{
      withAvatar: true,
      delay: 500,
      widget: "ageSelector",
    })
    props.setState((prev) => ({
      ...prev,
      messages : [...prev.messages, botmsg]
    }));
  }
  return (
    <div>
      {React.Children.map(props.children, (child) => {
        return React.cloneElement(child, {
          actions: {
            saveStudentName
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;