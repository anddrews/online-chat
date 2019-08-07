import * as React from "react";

import {styleNames} from 'utils/stylenames';
import styles from  './sidebar.scss';

interface Props {
  isVisible: boolean;
}

const sn = styleNames(styles);

export const SidebarComponent: React.FunctionComponent<Props> = ({isVisible, children}) => (
  <div id="mySidenav" className={sn('sidenav', {'active': isVisible})}>
    {children}
  </div>
);


