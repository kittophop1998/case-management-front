// export const createSearchParams = (obj: Record<string, any>): string => {
//   let objClean: Record<string, string> = {};
//   for (const key in obj) {
//     if (obj[key] === "" || obj[key] === null || obj[key] === undefined) {
//       continue;
//     }
//     if (Array.isArray(obj[key])) {
//       if (obj[key].length === 0) {
//         objClean[key] = "";
//         continue;
//       } else {
//         objClean[key] = obj[key].join(`,`); // i need to change logic status=created,closed to ?status=created&status=closed
//         continue;
//       }
//     }

//     if (typeof obj[key] === "string") {
//       objClean[key] = obj[key];
//       continue;
//     }
//     objClean[key] = JSON.stringify(obj[key]);
//   }
//   console.log(`objClean :`, objClean);
//   const searchParams = new URLSearchParams(objClean).toString();
//   return searchParams;
// };
export const createSearchParams = (obj: Record<string, any>): string => {
  const searchParams = new URLSearchParams();

  for (const key in obj) {
    const value = obj[key];
    if (value === "" || value === null || value === undefined) {
      continue;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      value.forEach((v) => searchParams.append(key, String(v)));
      continue;
    }

    if (typeof value === "string") {
      searchParams.append(key, value);
      continue;
    }

    searchParams.append(key, JSON.stringify(value));
  }

  return searchParams.toString();
};
