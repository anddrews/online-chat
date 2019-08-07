import * as React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import {styleNames} from 'utils/stylenames';
import {DialogMessage} from './dialog-message/dialog-message';
import {MessageInterface} from 'model/messageInterface';
import {Message} from './message/message';

import styles from './chat.scss';

const sn = styleNames(styles);

interface Props {
    isChatOpen: boolean;
    onCloseClick: () => void;
    sendMessage: (message: string) => void;
    messages: MessageInterface[]
}

export const Chat: React.FunctionComponent<Props> = ({isChatOpen, onCloseClick, messages, sendMessage}) => {
    const messagesRef = React.createRef<HTMLDivElement>();
    const scrollToUnread = () => {
        // @ts-ignore
        const {current: {container: {children}}} = messagesRef;
        const unreadMessage = children[0].querySelector(':not([class*="message__outgoing"])[data-read="false"]');

        if(unreadMessage) {
            unreadMessage.scrollIntoView();
        }
    };

    const sendMessageHandler = message => {
        // @ts-ignore
        const {current: {container: {children}}} = messagesRef;
        const unreadMessage: HTMLDivElement[] = Array.from(children[0].querySelectorAll('[class*="message__outgoing"][data-read="false"]'));

        if(unreadMessage.length) {
            unreadMessage[unreadMessage.length - 1].scrollIntoView();
        }

        sendMessage(message);
    };

    const markMessageAsRead = () => {
        console.log('scrollDown');
    };

    return (
        <div className={sn('chat', {'active': isChatOpen})}>
            <div className={sn('chat__header')}>
                <div className={sn('chat__company-name')}>
                    Напишите нам сообщение <br/>
                    Наши операторы онлайн
                </div>
                <div
                    onClick={onCloseClick}
                    className={sn('chat__close')}
                >
                    x
                </div>
            </div>
            <Scrollbars
                ref={messagesRef}
                style={{height: '100%'}}
                onUpdate={scrollToUnread}
                onScrollStart={markMessageAsRead}
            >
                <div className={sn('chat__messages')}>
                    {messages.map(item => (
                        <Message
                            key={item.id}
                            message={item}
                        />))}
                </div>
            </Scrollbars>
            <div className={sn('chat__dialog-message')}>
                <DialogMessage
                    onSubmit={sendMessageHandler}
                />
            </div>
        </div>
    );
}
