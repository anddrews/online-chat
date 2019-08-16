import * as React from 'react';
import openSocket from 'socket.io-client';

import {bearerToken, clientId, socketUri} from 'const';
import {Imessage} from '../model/Imessage';

import {Socket as ISocket} from 'socket.io';

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
interface PropsChat {
    messages: Imessage[];
    handleSendMessage: (text: string, attachments: any) => void;
}

interface Props {
    render: React.FunctionComponent<PropsChat>;
}

interface State {
    messages: Imessage[];
}
export class Socket extends React.Component<Props,State> {
    socket: ISocket;
    state = {
        messages: []
    };

    constructor(props) {
        super(props);

        this.socket = openSocket(socketUri, socketOption);
        // @ts-ignore
        this.socket.binaryType = 'arrayBuffer';

        this.socket.on('message:history', historyMessages => this.setMessages(historyMessages));

        this.socket.on('message:new', ([newMessages]) => {
            this.setMessages(this.state.messages.find(({messageId}) => messageId === newMessages.messageId)
                ? this.state.messages
                : [...this.state.messages, {...newMessages, messageId: this.state.messages.length + 1}])
            });

        this.socket.on('message:read', messageIds => {
            this.setMessages(this.state.messages.map(item => messageIds.includes(item.messageId) ? {
                ...item,
                read: true
            } : item))
        });

        this.socket.emit('subscribeToMessages', 'subscribe');
    }

    setMessages = messages => {
        this.setState({messages})
    };

    handleSendMessage = (text: string, attachments: any) => {
        this.socket.emit('message:out', text);
        if(attachments.length) {
            this.socket.emit('upload:file', attachments[0])
        }
    };

    render() {
        const {messages} = this.state;
        const {handleSendMessage} = this;
        const {render: RenderProp} = this.props;
        return (
            <React.Fragment>
                <RenderProp
                    messages={messages}
                    handleSendMessage={handleSendMessage}
                />
            </React.Fragment>
        );
    }
}
