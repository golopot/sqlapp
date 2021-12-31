/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

export default function InputText({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
}): React.ReactElement {
  return (
    <div style={{ display: 'block' }}>
      <label>
        <span className="fieldName">{label}</span>
        <input value={value} onChange={onChange} required={required} />
      </label>
    </div>
  );
}
