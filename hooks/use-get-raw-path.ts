import { useParams, usePathname } from "next/navigation";

export default function useGetRawPath() {
  const params = useParams();
  const pathname = usePathname();
  const splittedRoute = pathname.split("/");

  if (typeof params === "object" && params !== null) {
    let reconstructedPath = "";

    for (let i = 1; i < splittedRoute.length; i++) {
      const segment = splittedRoute[i];

      // Check if the segment matches any value in the params object
      const matchingKey = Object.keys(params).find(
        (key) => params[key] === segment
      );
      if (matchingKey) {
        // Replace the segment with the dynamic segment
        reconstructedPath += `/[${matchingKey}]`;
      } else {
        reconstructedPath += `/${segment}`;
      }
    }

    return reconstructedPath;
  } else {
    // Params object is not present
    return pathname;
  }
}
