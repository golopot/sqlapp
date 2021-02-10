/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  .fieldName {
    display: block;
  }
`;

export default function InputText(props: { label: string }) {
  const { label } = props;
  return (
    <Container>
      <label>
        <span className="fieldName">{label}</span>
        <input />
      </label>
    </Container>
  );
}
