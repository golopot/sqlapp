import fs from 'fs';

export interface Connection {
  id: string;
  host: string;
  user: string;
  password: string;
}

function getFilePath(): string {
  return '/home/jchn/sql.json';
}

export function writeConnections(conns: Connection[]) {
  const s = JSON.stringify(conns);
  fs.writeFileSync(getFilePath(), s);
}

export function readConnections(): Connection[] {
  const s = String(fs.readFileSync(getFilePath()));

  if (s === '') {
    return [];
  }

  try {
    const conns = JSON.parse(s);
    return conns;
  } catch (e) {
    console.error(e);
    return [];
  }
}
