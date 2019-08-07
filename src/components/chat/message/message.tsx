import * as React from 'react';

import {styleNames} from 'utils/stylenames';

import {Imessage} from 'model/Imessage';

import styles from './message.scss';

const sn = styleNames(styles);


interface Props {
    message: Imessage
}

export const Message: React.FunctionComponent<Props> = ({message: {content, userName, messageDate, currentUserName, read}}) => (
    <div
        data-read={read}
        className={sn('message', {'outgoing': userName === currentUserName})}
    >
        <div className={sn('message__info')}>
            {userName !== currentUserName && userName} {messageDate.toLocaleTimeString()}
        </div>
        <div
            className={sn('message__content')}
        >
            <div dangerouslySetInnerHTML={{__html: content}} />
            {userName === currentUserName && <div className={sn('message__status', {'read': read})} >&#10003;</div>}
        </div>
    </div>
);
