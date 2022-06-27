import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

export default class chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    };
  }

  //send message will no longer overlap/replace 'hello developer'
  onSend(messageSend = []) {
    this.setState(previousMessages => ({
      message: GiftedChat.append(previousMessages.messsage, messageSend),
    }));
  }

  render() {
    const chat = (
      <GiftedChat
        messages={this.state.message}
        onSend={messageSend => this.onSend(messageSend)}
        user={{
          _id: 1,
        }}
      />
    );

    if (Platform.OS === 'android') {
      return (
        <KeyboardAvoidingView
          style={{flex: 1}}
          behaviour="padding"
          keyboardVerticalOffset={30}
          enabled>
          {chat}
        </KeyboardAvoidingView>
      );
    } else {
      return chat;
    }
  }
}
