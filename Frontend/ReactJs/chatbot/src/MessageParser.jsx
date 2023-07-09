import React from 'react';

const MessageParser = (props) => {  
  const parse = (message) => {
    var messages = props.children.props.state.messages
    const lastBotMsg = messages[messages.length -1].message
    if(lastBotMsg === 'Enter your Name'){
      props.actions.saveStudentName(message)
    }
  };

  return (
    <div>
      {React.Children.map(props.children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;