export const createSearchParams = (obj: Record<string, any>): string => {
  let objClean: Record<string, string> = {};
  for (const key in obj) {
    if ((obj[key] !== "" && obj[key] !== null) || (obj[key] && undefined)) {
      objClean[key] = JSON.stringify(obj[key]);
    }
  }
  console.log(`createSearchParams:obj`, objClean);
  const searchParams = new URLSearchParams(objClean).toString();
  return searchParams;
};
