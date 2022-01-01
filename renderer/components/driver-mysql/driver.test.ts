import driver from './driver';

const config = {
  host: '127.0.0.1',
  user: 'root',
  password: 'pp',
};

describe('driver-mysql', () => {
  test('get databases', async () => {
    const conn = await driver.connect(config);
    const dbs = await conn.getDatabases();
    console.log(dbs);
  });

  test('get tables', async () => {
    const conn = await driver.connect(config);
    const dbs = await conn.getDatabases();
    const tables = await conn.getTables(dbs[0]);
    console.log(tables);
  });
});
