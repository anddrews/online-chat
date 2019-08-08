import * as React from 'react';

import {Socket as SocketIo, Event} from 'react-socket-io';

import {backEndToken, widgetToken, socketUri} from 'constants/socket';

const socketOption = {
    reconnection: true,
    reconnectionAttempts: null,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 10000,
    autoConnect: true,
    transports: ['websocket'],
    rejectUnauthorized: true,
    query: {
        token: backEndToken,
        client_id: widgetToken,
        type: 'widget',
        room: '797be098-eb5e-4efb-801f-734f9b55af51'

    }
};

export const Socket = ({children: Children}) => {
    const [messages, setMessages] = React.useState([]);

    const storeHistory = historyMessages => {
        setMessages(historyMessages)
    };

    return (
        <SocketIo
            uri={socketUri}
            options={socketOption}
        >
            <React.Fragment>
                <Event event='message:history' handler={storeHistory} />
                {(props) => <Children {...props} messages={messages} />}
            </React.Fragment>
        </SocketIo>
    );
}
