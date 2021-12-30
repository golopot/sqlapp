import React from 'react';
import * as Connector from './connector';
import { QueryResult as Result } from './driver/driver';
import ReactDataGrid from 'react-data-grid';

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

      const formattedRows = [] as any[];

      for (const row of r.rows) {
        const newRow = {} as any;
        for (const col of r.columns) {
          newRow[col.name] = String(row[col.name]);
        }
        formattedRows.push(newRow);
      }
      setData({
        type: 'Rows',
        columns: r.columns,
        rows: formattedRows,
      });
    })();
  }, [connector, database, tableName]);

  function handleGridRowsUpdated({ fromRow, toRow, updated }) {
    for (let i = fromRow; i <= toRow; i++) {
      rows[i] = { ...rows[i], ...updated };
    }
    setData({
      type: 'Rows',
      columns,
      rows,
    });
  }

  return (
    <div>
      <ReactDataGrid
        columns={columns.map((x) => ({
          key: x.name,
          name: x.name,
          editable: true,
        }))}
        rowGetter={(i) => rows[i]}
        rowsCount={rows.length}
        minHeight={height}
        onGridRowsUpdated={handleGridRowsUpdated}
        enableCellSelect
      />
    </div>
  );
}
