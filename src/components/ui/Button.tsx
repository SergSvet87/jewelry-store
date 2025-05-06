import { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
}

export const Button = ({ className, variant = 'primary', ...props }: ButtonProps) => {
  const base = 'rounded-xl px-6 py-3 font-medium transition-colors duration-300';
  const variants = {
    primary:
      'bg-[var(--button)] text-[var(--main)] hover:bg-opacity-90 focus:ring-2 focus:ring-[var(--accent)]',
    outline:
      'border border-[var(--button)] text-[var(--button)] hover:bg-[var(--button)] hover:text-[var(--main)]',
    ghost: 'bg-transparent hover:bg-[var(--main)] hover:text-[var(--brown-dark)]',
  };

  return <button className={cn(base, variants[variant], className)} {...props} />;
};
