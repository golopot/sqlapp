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

export interface Connection {
  getDatabases(): Promise<string[]>;
  getTables(db: string): Promise<string[]>;
  query(q: string): Promise<any>;
}
