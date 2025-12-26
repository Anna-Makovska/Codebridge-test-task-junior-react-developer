import { Link } from 'react-router-dom';
import s from './Button.module.scss';

interface ButtonProps {
  to: string;
  children: React.ReactNode;
  icon: string;
  iconPosition?: 'left' | 'right';
}

export const Button = ({ to, children, icon, iconPosition = 'left' }: ButtonProps) => {
  return (
    <Link to={to} className={s.link}>
      {iconPosition === 'left' && <img src={icon} alt="icon" className={s.icon} />}
      {children}
      {iconPosition === 'right' && <img src={icon} alt="icon" className={s.icon} />}
    </Link>
  );
};
