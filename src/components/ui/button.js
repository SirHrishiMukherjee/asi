import React from 'react';

export function Button({ children, ...props }) {
  return (
    <button {...props} className={props.className || ''}>
      {children}
    </button>
  );
}

export default Button;
