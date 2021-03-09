import React from 'react';
import styled from 'styled-components';
import * as Connector from './connector';
import { QueryResult as Result } from './driver/driver';
import ReactDataGrid from 'react-data-grid';

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
  height,
}: {
  connector: Connector.Connector;
  database: string;
  tableName: string;
  height: number;
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
      <ReactDataGrid
        columns={columns.map((x) => ({ key: x.name, name: x.name }))}
        rowGetter={(i) => rows[i]}
        rowsCount={rows.length}
        minHeight={height}
      />
    </div>
  );
}
