/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  .fieldName {
    display: block;
  }
`;

const InputText = React.forwardRef(
  (
    props: {
      label: string;
      value: any;
      onChange: (event: any) => void;
      required?: boolean;
    },
    ref: any
  ) => {
    const { label, value, onChange, required } = props;
    return (
      <Container>
        <label>
          <span className="fieldName">{label}</span>
          <input
            value={value}
            onChange={onChange}
            required={required}
            ref={ref}
          />
        </label>
      </Container>
    );
  }
);

export default InputText;
