import * as React from 'react';

import {styleNames} from 'utils/stylenames';
import {ChatOpener} from 'components/chat/chat-opener/chat-opener';
import {Chat} from 'components/chat/chat';
import {Message} from 'components/chat/message/message';
import {ChatHeader} from 'components/chat-header/chat-header';

import styles from './app.scss';
import {Socket} from 'containers/socket';
import {bearerToken} from 'constants/index';

const sn = styleNames(styles);

export const App: React.FunctionComponent = () => {
    const [isChatOpen, toggleChatOpen] = React.useState(true);

    const chatOpenHandler = () => {
        toggleChatOpen(!isChatOpen)
    };

    const handleSendMessage = msg => {
        fetch(`https://api-test.chatbullet.com/api/v1/widget/send`, {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearerToken}`
            },
            body: JSON.stringify({
                client_id: "8bmntsmhczgkw9p8e6yrt:1652026085",
                messages: [{type: "text", text: msg}],
                token: "6b64d579-74a1-41e3-8a65-10a19c6adb3d",
                user: {name: "Anonymous"},
            })
        })
    };

    const renderChat = (messages) => (
        <Chat
            chatHeader={ChatHeader}
            isChatOpen={isChatOpen}
            onCloseClick={chatOpenHandler}
            sendMessage={handleSendMessage}
            messagesLength={messages.length}
        >
            {messages.map(item => (
                <Message
                    key={item.messageId}
                    message={item}
                />))}
        </Chat>
    );

    return (
        <div className={sn('chat')}>
            <Socket
                render={renderChat}
            />
            <ChatOpener
                onClick={chatOpenHandler}
            />
        </div>
    )
};
