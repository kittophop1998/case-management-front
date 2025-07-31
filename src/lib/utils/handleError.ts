import { setAccessToken, setRefreshToken } from "@/services/api";
import { redirect } from "next/navigation";


export const handleError401 = async ({ pathname }) => {
    function globToRegex(glob: string): RegExp {
        const regex = glob
            .replace(/\*\*/g, '.*')      // match any number of directories
            .replace(/\*/g, '[^/]*')     // match any part of a path segment
            .replace(/\//g, '\\/');      // escape slash
        return new RegExp(`^${regex}$`);
    }
    function isPublicRoute(path: string, publicRoutes: string[]): boolean {
        return publicRoutes.some(glob => globToRegex(glob).test(path));
    }
    const publicRoutes = [
        "/*/login",
    ];
    const isPublic = isPublicRoute(pathname, publicRoutes);
    if (!isPublic) {
        console.log("Root.handle401().run()", isPublic, pathname);
        setAccessToken("");
        setRefreshToken("");
        console.log("!!!!!!!! handleError401 redirect(`/login`)", pathname);
        redirect(`/login`);
    };

};
