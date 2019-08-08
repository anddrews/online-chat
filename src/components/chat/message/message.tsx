import * as React from 'react';

import {styleNames} from 'utils/stylenames';

import {Imessage} from 'model/Imessage';

import styles from './message.scss';

const sn = styleNames(styles);


interface Props {
    message: Imessage
}

export const Message: React.FunctionComponent<Props> = ({message: {messageId, text, out, date, authorName, read}}) => (
    <div
        data-read={read}
        data-id={messageId}
        className={sn('message', {'outgoing': !out})}
    >
        <div className={sn('message__info')}>
            {out && authorName} {new Date(date).toLocaleTimeString()}
        </div>
        <div
            className={sn('message__content')}
        >
            <div dangerouslySetInnerHTML={{__html: text}} />
            {!out && <div className={sn('message__status', {'read': read})} >&#10003;</div>}
        </div>
    </div>
);
