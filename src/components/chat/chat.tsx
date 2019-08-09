import * as React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import {styleNames} from 'utils/stylenames';
import {DialogMessage} from './dialog-message/dialog-message';
import {Imessage} from 'model/Imessage';

import styles from './chat.scss';

const sn = styleNames(styles);

interface Props {
    isChatOpen: boolean;
    onCloseClick: () => void;
    sendMessage: (message: string) => void;
    renderHeader: React.FunctionComponent;
    renderMessage: React.FunctionComponent<{message: Imessage}>;
    messages: Imessage[];
}

export const Chat: React.FunctionComponent<Props> = ({
         isChatOpen,
         onCloseClick,
         messages,
         sendMessage,
         renderHeader: Header,
         renderMessage: MessageComponent
    }) => {
    const messagesRef = React.createRef<HTMLDivElement>();
    const [isScrollToUnread, setScrollToUnread] = React.useState(true);

    const scrollToUnread = () => {
        // @ts-ignore
        const {current: {container: {children}}} = messagesRef;
        const unreadMessage = children[0].querySelector(':not([class*="message__outgoing"])[data-read="false"]');

        if(unreadMessage) {
            unreadMessage.scrollIntoView();
        }
    };

    const scrollToLast = () => {
        // @ts-ignore
        const {current: {container: {children}}} = messagesRef;
        const lastMessage: HTMLDivElement = children[0].firstElementChild.lastElementChild;

        if(lastMessage) {
            lastMessage.scrollIntoView();
        }

    };

    const markMessageAsRead = () => {
        console.log('scrollDown');
    };

    React.useEffect(() => {
        if (messages.length && isScrollToUnread) {
            scrollToUnread();
            setScrollToUnread(false)
        } else {
            scrollToLast();
        }
    }, [messages])

    return (
        <div className={sn('chat', {'active': isChatOpen})}>
            <div className={sn('chat__header')}>
                <Header />
                <div
                    onClick={onCloseClick}
                    className={sn('chat__close')}
                >
                    x
                </div>
            </div>
            <div className={sn('chat__messages-wrapper')}>
                <Scrollbars
                    ref={messagesRef}
                    style={{height: '100%'}}
                    onScrollStart={markMessageAsRead}
                >
                    <div className={sn('chat__messages')}>
                        {messages.map(item => (
                            <MessageComponent
                                key={item.messageId}
                                message={item}
                            />
                        ))}
                    </div>
                </Scrollbars>
            </div>
            <div className={sn('chat__dialog-message')}>
                <DialogMessage
                    onSubmit={sendMessage}
                />
            </div>
        </div>
    );
};
