export const isSame = (obj1: Record<string, any>, obj2: Record<string, any>) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);

export const clone = (obj: any) => JSON.parse(JSON.stringify(obj));
