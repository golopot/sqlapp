export interface Table {
  View(): any[];
}

export interface ConnectionConfig {
  host: string;
  user: string;
  password: string;
}

export interface Driver {
  id: string;
  connect(config: ConnectionConfig): Promise<Connection>;
}

export type QueryResult = Rows;

export interface Column {
  name: string;
}

export interface Rows {
  type: 'Rows';
  columns: Column[];
  rows: any[];
}

export interface Connection {
  getDatabases(): Promise<string[]>;
  getTables(db: string): Promise<string[]>;
  query(q: string): Promise<QueryResult>;
}
