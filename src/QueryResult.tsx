import React from 'react';
import styled from 'styled-components';
import * as Connector from './connector';
import { QueryResult as Result } from './driver/driver';

// const columns = ['name', 'telephone', 'location'];

// const rows = [
//   ['Maria Garcia', '(442) 094-8134', 'Vermont'],
//   ['Maria Garcia', '(442) 094-8134', 'Vermont'],
//   ['Maria Garcia', '(442) 094-8134', 'Vermont'],
//   ['Maria Garcia', '(442) 094-8134', 'Vermont'],
// ];

const STable = styled.table`
  border-collapse: collapse;
  td,
  th {
    min-width: 80px;
    padding: 4px 0 4px 2px;
    border: 1px black solid;
  }
`;

export default function QueryResult({
  connector,
  database,
  tableName,
}: {
  connector: Connector.Connector;
  database: string;
  tableName: string;
}) {
  const [data, setData] = React.useState({
    type: 'Rows',
    columns: [],
    rows: [],
  } as Result);

  const { columns, rows } = data;

  React.useEffect(() => {
    (async () => {
      const conn = await Connector.connect(connector);
      const r = await conn.query(
        `SELECT * FROM ${database}.${tableName} LIMIT 200`
      );
      setData(r);
    })();
  }, [connector, database, tableName]);

  return (
    <div>
      <STable>
        <thead>
          <tr>
            {columns.map((c, j) => (
              // eslint-disable-next-line react/no-array-index-key
              <th key={j}>{c.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={i}>
              {columns.map((c, j) => (
                // eslint-disable-next-line react/no-array-index-key
                <td key={j}>{String(row[c.name])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </STable>
    </div>
  );
}
