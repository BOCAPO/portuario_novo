import { useState } from 'react';

import scss from './Switch.module.scss';
import { ISwitchProps } from './types';

const Switch = (props: ISwitchProps) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const containerClass = [scss.container];

  const onSwitchClick = () => {
    setIsSwitchOn((prevValue) => !prevValue);
    if (props.onClick) props.onClick();
  };

  const onSwitchKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      setIsSwitchOn((prevValue) => !prevValue);
      if (props.onClick) props.onClick();
    }
  };

  if (isSwitchOn) containerClass.push(scss.active);
  if (props.className) containerClass.push(props.className);

  return (
    <div
      className={containerClass.join(' ')}
      onClick={onSwitchClick}
      onKeyPress={onSwitchKeyPress}
      role="switch"
      aria-checked="false"
      tabIndex={0}
    >
      <div className={scss.content}>
        <div className={scss.firstOption}>
          <span>{props.firstOption}</span>
        </div>
        <div className={scss.secondOption}>
          <span>{props.secondOption}</span>
        </div>
      </div>
      <div className={scss.slider} />
    </div>
  );
};

export default Switch;
