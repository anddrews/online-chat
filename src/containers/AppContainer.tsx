import * as React from 'react';
import {Socket} from './socket';
import {Chat} from 'components/chat/chat';

export const App = () => (
    <Socket
        render={Chat}
    />
)