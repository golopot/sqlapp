import React from "react";
import * as Connector from "./connector/connector";
import DataGrid from "./data-grid/data-grid";
import { QueryResult as Result } from "./driver/driver";
import styles from "./QueryResult.module.scss";

function renderCell(v: any) {
  return String(v);
}

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
}): React.ReactElement {
  const [data, setData] = React.useState({
    type: "Rows",
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const formattedRows = [] as any[];

      for (const row of r.rows) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newRow = {} as any;
        for (const col of r.columns) {
          newRow[col.name] = String(row[col.name]);
        }
        formattedRows.push(newRow);
      }
      setData({
        type: "Rows",
        columns: r.columns,
        rows: formattedRows,
      });
    })();
  }, [connector, database, tableName]);

  return (
    <div className={styles.queryResult}>
      <DataGrid
        columns={columns.map((x) => ({
          key: x.name,
          name: x.name,
          editable: true,
        }))}
        rows={rows}
        renderCell={renderCell}
      />
    </div>
  );
}
