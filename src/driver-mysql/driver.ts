import Mysql from 'mysql2/promise';
import { FieldPacket } from 'mysql2';
import type {
  Connection,
  ConnectionConfig,
  Driver,
  QueryResult,
  Column,
} from '../driver/driver';

function convertColumn(c: FieldPacket): Column {
  return {
    name: c.name,
  };
}

async function connect(c: ConnectionConfig): Promise<Connection> {
  const conn = await Mysql.createConnection({
    host: c.host,
    user: c.user,
    password: c.password,
  });

  return {
    async getDatabases(): Promise<string[]> {
      const [rows] = await conn.query('SHOW DATABASES');
      const rows_ = rows as Mysql.RowDataPacket[];
      return rows_.map((x) => x.Database);
    },

    async getTables(db: string): Promise<string[]> {
      await conn.query(`USE ${db}`);
      const [rows, cols] = await conn.query('SHOW FULL TABLES');
      const col0 = cols[0].name;
      const rows_ = rows as Mysql.RowDataPacket[];
      return rows_.map((x) => x[col0]);
    },

    async query(q: string): Promise<QueryResult> {
      const r = await conn.query(q);
      return {
        type: 'Rows',
        columns: r[1].map((x) => convertColumn(x)),
        rows: r[0] as any[], // eslint-disable-line @typescript-eslint/no-explicit-any
      };
    },
  };
}

const driver: Driver = {
  id: 'mysql',
  connect,
};

export default driver;
