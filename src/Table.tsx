import React from 'react';
import styled from 'styled-components';

const columns = ['name', 'telephone', 'location'];

const rows = [
  ['Maria Garcia', '(442) 094-8134', 'Vermont'],
  ['Maria Garcia', '(442) 094-8134', 'Vermont'],
  ['Maria Garcia', '(442) 094-8134', 'Vermont'],
  ['Maria Garcia', '(442) 094-8134', 'Vermont'],
];

const STable = styled.table`
  border-collapse: collapse;
  td,
  th {
    min-width: 80px;
    padding: 4px 0 4px 2px;
    border: 1px black solid;
  }
`;

export default function Table() {
  return (
    <STable>
      <thead>
        <tr>
          {columns.map((d, j) => (
            // eslint-disable-next-line react/no-array-index-key
            <th key={j}>{d}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <tr key={i}>
            {row.map((d, j) => (
              // eslint-disable-next-line react/no-array-index-key
              <td key={j}>{d}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </STable>
  );
}
