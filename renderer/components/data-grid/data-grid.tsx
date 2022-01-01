import React, { Fragment as div } from "react";
import styles from "./data-grid.module.scss";

interface Column {
  key: string;
  name: string;
}

type RenderCell = (_: any) => React.ReactElement | string;

const Row = React.memo(function Row({
  columns,
  row,
  renderCell,
}: {
  columns: Column[];
  row: { [_: string]: any };
  renderCell: RenderCell;
}) {
  return (
    <div className="data-grid-row">
      {columns.map((c) => (
        <div className="data-grid-cell" key={c.key}>
          {renderCell(row[c.key])}
        </div>
      ))}
    </div>
  );
});

export default function DataGrid({
  columns,
  rows,
  renderCell,
}: {
  columns: Column[];
  rows: { [_: string]: any }[];
  renderCell: RenderCell;
}) {
  return (
    <div>
      <div className="data-grid-header">
        {columns.map((c) => (
          <div className="data-grid-cell" key={c.key}>
            {c.name}
          </div>
        ))}
      </div>
      <div className="data-grid-body">
        {rows.map((row) => (
          <Row columns={columns} row={row} renderCell={renderCell} />
        ))}
      </div>
    </div>
  );
}
