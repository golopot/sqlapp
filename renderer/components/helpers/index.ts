export function without<T>(a: T[], e: T): T[] {
  const i = a.findIndex((x) => x === e);
  if (i === -1) {
    return a.slice();
  }
  return [...a.slice(0, i), ...a.slice(i + 1)];
}

export function arraySwitch<T>(array: T[], i: number, j: number): T[] {
  const b = array.slice();
  const temp = b[i];
  b[i] = b[j];
  b[j] = temp;
  return b;
}
