/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  .fieldName {
    display: block;
  }
`;

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
    <Container>
      <label>
        <span className="fieldName">{label}</span>
        <input value={value} onChange={onChange} required={required} />
      </label>
    </Container>
  );
}
