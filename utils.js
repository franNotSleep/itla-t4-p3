export const SECOND = 1000;

export async function waitTill(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  })
}

export function wrongBehavior(expected, got) {
  const msg = `Wrong Behavior: Expected "${expected}" Got "${got}"`;
  throw new WrongBehavior(msg);
}

export class WrongBehavior extends Error {
  constructor(msg) {
    super(msg);
  }
}
