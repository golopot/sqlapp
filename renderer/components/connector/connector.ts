import fs from "fs";
import * as Driver from "../driver/driver";
import mysqlDriver from "../driver-mysql/driver";

import os from "os";
import path from "path";
const drivers = [mysqlDriver];

export interface Database {
  name: string;
  tables: string[];
}

export interface Connector {
  id: string;
  host: string;
  user: string;
  password: string;
  databases: Database[];
  driverId: string;
}

function getFilePath(): string {
  return path.join(os.homedir(), "sql.json");
}

export function getDriver(conn: Connector): Driver.Driver {
  const driver = drivers.find((d) => d.id === conn.driverId);
  if (driver === undefined) {
    throw new Error(`cannot find driver ${conn.driverId}`);
  }
  return driver;
}

export async function connect(conn: Connector): Promise<Driver.Connection> {
  const driver = getDriver(conn);
  const connection = await driver.connect({
    host: conn.host,
    user: conn.user,
    password: conn.password,
  });

  return connection;
}

export function writeConnections(conns: Connector[]): void {
  const s = JSON.stringify(conns);
  fs.writeFileSync(getFilePath(), s);
}

export function readConnections(): Connector[] {
  let s = "";
  try {
    s = String(fs.readFileSync(getFilePath()));
  } catch (e) {
    if (e.code === "ENOENT") {
      return [];
    }
    throw e;
  }

  try {
    const conns = JSON.parse(s);
    return conns;
  } catch (e) {
    console.error(e);
    return [];
  }
}
