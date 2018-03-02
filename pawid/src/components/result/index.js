import React from 'react';
import { Icon } from 'antd';
import {DivResult,Divicon,DivTitle} from './style'


export default function Result({ className, type, title, description, extra, actions, ...restProps }) {
  const iconMap = {
    error: <Icon className='error' type="close-circle" />,
    success: <Icon className='success' type="check-circle" />
  };

  return (
    <DivResult {...restProps}>
      <Divicon >{iconMap[type]}</Divicon>
      <DivTitle>{title}</DivTitle>
      {<div className='description'>{description}</div>}
      {/*{extra && <div className={styles.extra}>{extra}</div>}*/}
      {/*{actions && <div className={styles.actions}>{actions}</div>}*/}
    </DivResult>
  );
}
