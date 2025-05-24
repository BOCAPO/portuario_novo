import React, {useState} from 'react';
import styles from './styles.module.scss';

export interface Props {
  checked?: boolean;
  label?: string | JSX.Element;
  onChange?: any;
}

const CheckBox: React.FC<Props> = ({ checked, label, onChange }) => {
  const [inputChecked, setInputChecked] = useState(checked);
  return (
    <label className={styles.container}>
      <div className={styles.label}>
        <input
          type="checkbox"
          className={styles.checkBoxInput}
          defaultChecked={inputChecked ?? false}
          onChange={(event) => {
            setInputChecked(event.currentTarget.checked)

            if(onChange){
              onChange(event.currentTarget.checked)
            }
          }}
        />
        <div className={`${styles.checkMarkContainer} ${inputChecked && styles.checked}`}>
          <svg className={styles.checkMark} width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.50002 8.21L0.39502 5.105L1.81002 3.69L3.50002 5.385L8.44002 0.440002L9.85502 1.855L3.50002 8.21Z" fill="#00793F"/>
          </svg>
        </div>
        <div>{label}</div>
      </div>
    </label>
  );
};

export default CheckBox;
