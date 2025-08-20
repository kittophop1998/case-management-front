export const createSearchParams = (obj: Record<string, any>): string => {
  let objClean: Record<string, string> = {};
  for (const key in obj) {
    if (obj[key] === "" || obj[key] === null || obj[key] === undefined) {
      continue;
    }
    if (typeof obj[key] === "string") {
      objClean[key] = obj[key];
      continue;
    }
    objClean[key] = JSON.stringify(obj[key]);
  }
  const searchParams = new URLSearchParams(objClean).toString();
  return searchParams;
};
