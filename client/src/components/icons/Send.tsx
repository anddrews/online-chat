import * as React from 'react';

import {styleNames} from 'utils/stylenames';

import styles from './send-icon.scss';

const sn = styleNames(styles);

export const IconSend = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        enableBackground="new 0 0 24 24"
        width="24px"
        height="24px"
        className={sn('icon-send')}
    >
        <path d="M 2 3 L 2 10.8125 L 18 12 L 2 13.1875 L 2 21 L 22 12 L 2 3 z"/>
    </svg>
)
