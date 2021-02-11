import Mysql from 'mysql2/promise';
import type { Connection, ConnectionConfig, Driver } from '../driver/driver';

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

    async query(q: string) {
      return conn.query(q);
    },
  };
}

const driver: Driver = {
  id: 'mysql',
  connect,
};

export default driver;
