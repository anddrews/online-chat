import * as React from 'react';

import {styleNames} from 'utils/stylenames';
import {ChatOpener} from 'components/chat/chat-opener/chat-opener';
import {Chat} from 'components/chat/chat';
import {Message} from 'components/chat/message/message';
import {ChatHeader} from 'components/chat-header/chat-header';

import styles from './app.scss';
import {Socket} from 'containers/socket';
import {bearerToken} from 'const';
import {Imessage} from './model/Imessage';

const sn = styleNames(styles);

export const App: React.FunctionComponent = () => {
    const [isChatOpen, toggleChatOpen] = React.useState(true);

    const chatOpenHandler = () => {
        toggleChatOpen(!isChatOpen)
    };

    interface Props {
        messages: Imessage[];
        handleSendMessage: (text: string, attachments: any) => void;
    }
    const renderChat: React.FunctionComponent<Props> = ({messages, handleSendMessage}) => (
        <Chat
            renderHeader={ChatHeader}
            isChatOpen={isChatOpen}
            onCloseClick={chatOpenHandler}
            sendMessage={handleSendMessage}
            renderMessage={Message}
            messages={messages}
        />
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
