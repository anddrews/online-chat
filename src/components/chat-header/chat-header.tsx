import * as React from 'react';
import {styleNames} from 'utils/stylenames';

import styles from './chat-header.scss';

const sn = styleNames(styles);

export const ChatHeader = () => (
    <div className={sn('chat-header')}>
        <div className={sn('chat-header__icon')} />
        Напишите нам сообщение <br/>
        Наши операторы онлайн
    </div>
)
