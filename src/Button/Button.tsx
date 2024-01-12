import {
    FC, 
    DetailedHTMLProps, 
    ButtonHTMLAttributes
} from 'react';
import styles from './Button.module.css';

interface IButton 
extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    classes: string;
}

const Button: FC<IButton> = ({classes, children, ...props}) => {
  return (
    <button {...props} className={`${styles.btn} ${classes ? styles.btn : '' }`}>
      {children}
    </button>
  )
}

export default Button;
