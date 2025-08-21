import React from 'react';

export function Select({ children, onValueChange }) {
  const handleChange = (e) => {
    onValueChange && onValueChange(e.target.value);
  };
  return <select onChange={handleChange}>{children}</select>;
}

export function SelectTrigger({ children }) {
  return <>{children}</>;
}

export function SelectValue({ placeholder }) {
  return <option value="">{placeholder}</option>;
}

export function SelectContent({ children }) {
  return <>{children}</>;
}

export function SelectItem({ children, value }) {
  return <option value={value}>{children}</option>;
}

export default Select;
