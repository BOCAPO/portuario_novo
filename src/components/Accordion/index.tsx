import React, {useState, FunctionComponent} from "react";

import Collapsible from 'react-collapsible';

import styles from './styles.module.scss'

export interface IAccordion {
  title: string | JSX.Element;
  styleTitle?: any;
  children: JSX.Element | JSX.Element[];
  id?: string;
}

const Accordion: FunctionComponent<IAccordion> = ({title, children, styleTitle}) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const changeIcon = (open: boolean) => {
    setOpen(open);
  }


  return (
    <div>
      {/* @ts-ignore */}
      <Collapsible
        transitionTime={200}
        onTriggerOpening={() => changeIcon(true)}
        onTriggerClosing={() => changeIcon(false)}
        trigger={
          <div className={styles.accordionTitle}>
            {title}
            <i className={`icon icon-arrow-down ${!isOpen && styles.iconRevert}`}/>
          </div>
        }
      >
        <div>
          {children}
        </div>
      </Collapsible>
    </div>
  );
}

export default Accordion;
