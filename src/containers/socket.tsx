import * as React from 'react';

import {Socket as SocketIo, Event} from 'react-socket-io';

import {bearerToken, clientId, socketUri} from 'const/socket';
// b5f2db49-f6b4-4801-b78c-2bd47002d1cc
const socketOption = {
    reconnection: true,
    reconnectionAttempts: null,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 10000,
    autoConnect: true,
    transports: ['websocket'],
    rejectUnauthorized: true,
    query: {
        token: bearerToken,
        client_id: clientId,
        type: 'widget',
        room: 'b5f2db49-f6b4-4801-b78c-2bd47002d1cc'

    }
};

export const Socket = ({render}) => {
    const [messages, setMessages] = React.useState([]);

    const storeHistory = historyMessages => {
        setMessages(historyMessages.reverse())
    };

    const storeMessage = newMessages => {
        setMessages(messages => [...messages, ...newMessages])
    };

    const storeOutgoingMessage = ([newMessages]) => {
        setMessages(messages => messages.find(({messageId}) => messageId === newMessages.messageId)
            ? messages
            : [...messages, {...newMessages, messageId: messages.length + 1}])
    };

    return (
        <SocketIo
            uri={socketUri}
            options={socketOption}
        >
            <React.Fragment>
                <Event event='message:history' handler={storeHistory} />
                <Event event='message:new' handler={storeOutgoingMessage} />
                <Event event='widget:message' handler={storeMessage} />
                {render(messages)}
            </React.Fragment>
        </SocketIo>
    );
}
