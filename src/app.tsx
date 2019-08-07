import * as React from 'react';

import {ChatOpener} from 'components/chat/chat-opener/chat-opener';
import {styleNames} from 'utils/stylenames';

import styles from './app.scss';
import {Chat} from './components/chat/chat';
import {CURRENT_USER_NAME} from 'const';
import {Imessage} from './model/Imessage';

const sn = styleNames(styles);

const message = [
    {
        id: 1,
        userName: 'Anonymous',
        content: `sdfs
        ;lk;k
        l;k;k`,
        messageDate: new Date(),
        currentUserName: CURRENT_USER_NAME,
        read: true
    },
    {
        id: 2,
        userName: 'Username',
        content: `&#x1f600 adasdas
         &#x1f600`,
        messageDate: new Date(),
        currentUserName: CURRENT_USER_NAME,
        read: true
    },
    {
        id: 3,
        userName: 'Username',
        content: `sdfs  ;lk;k l;k;k`,
        messageDate: new Date(),
        currentUserName: CURRENT_USER_NAME,
        read: true
    },
    {
        id: 4,
        userName: 'Username',
        content: `sdfs  ;lk;k l;k;k`,
        messageDate: new Date(),
        currentUserName: CURRENT_USER_NAME,
        read: true
    },
    {
        id: 5,
        userName: 'Username',
        content: `test message`,
        messageDate: new Date(),
        currentUserName: CURRENT_USER_NAME,
        read: true
    },
    {
        id: 6,
        userName: 'Username',
        content: `sdfs  ;lk;k l;k;k`,
        messageDate: new Date(),
        currentUserName: CURRENT_USER_NAME,
        read: true
    },
    {
        id: 7,
        userName: 'Username',
        content: `sdfs  ;lk;k l;k;k`,
        messageDate: new Date(),
        currentUserName: CURRENT_USER_NAME,
        read: true
    },
    {
        id: 8,
        userName: 'Username',
        content: `test message 2`,
        messageDate: new Date(),
        currentUserName: CURRENT_USER_NAME,
        read: true
    },
    {
        id: 9,
        userName: 'Username',
        content: `sdfs  ;lk;k l;k;k`,
        messageDate: new Date(),
        currentUserName: CURRENT_USER_NAME,
        read: true
    },
];

export const App: React.FunctionComponent = () => {
    const [isChatOpen, toggleChatOpen] = React.useState(true);
    const [messages, addMessage] = React.useState(message as Array<Imessage>);

    const chatOpenHandler = () => {
        toggleChatOpen(!isChatOpen)
    };

    const handleSendMessage = msg => {
        addMessage([...messages, {
            id: messages.length + 1,
            userName: CURRENT_USER_NAME,
            content: msg,
            messageDate: new Date(),
            currentUserName: CURRENT_USER_NAME,
            read: false}])
    };

    return (
        <div className={sn('chat')}>
            <Chat
                isChatOpen={isChatOpen}
                onCloseClick={chatOpenHandler}
                sendMessage={handleSendMessage}
                messages={messages}
            >

            </Chat>
            <ChatOpener
                onClick={chatOpenHandler}
            />

        </div>
    )
};
