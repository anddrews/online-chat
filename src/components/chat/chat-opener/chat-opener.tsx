import * as React from 'react';

import {styleNames} from 'utils/stylenames';

import styles from './chat-opener.scss';

const sn = styleNames(styles);

interface Props {
    onClick: () => void
}

export const ChatOpener: React.FunctionComponent<Props> = ({onClick}) => (
    <div
        className={sn('chat-opener')}
        onClick={onClick}
    />
);
