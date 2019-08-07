import * as React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import {styleNames} from 'utils/stylenames';
import {DialogMessage} from './dialog-message/dialog-message';
import {Imessage} from 'model/Imessage';
import {Message} from './message/message';

import styles from './chat.scss';

const sn = styleNames(styles);

interface Props {
    isChatOpen: boolean;
    onCloseClick: () => void;
    sendMessage: (message: string) => void;
    messagesLength: number;
}

export const Chat: React.FunctionComponent<Props> = ({isChatOpen, onCloseClick, children, sendMessage, messagesLength}) => {
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
        const lastMessage: HTMLDivElement = children[0].querySelector('[data-read]:last-child');

        if(lastMessage) {
            lastMessage.scrollIntoView();
        }

    };

    const markMessageAsRead = () => {
        console.log('scrollDown');
    };

    React.useEffect(() => {
        if (isScrollToUnread) {
            scrollToUnread();
            setScrollToUnread(false)
        } else {
            scrollToLast();
        }
    }, [messagesLength])

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
                onScrollStart={markMessageAsRead}
            >
                <div className={sn('chat__messages')}>
                    {children}
                </div>
            </Scrollbars>
            <div className={sn('chat__dialog-message')}>
                <DialogMessage
                    onSubmit={sendMessage}
                />
            </div>
        </div>
    );
};
