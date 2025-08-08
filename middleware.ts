import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

const locales = ["en", "th"]
const defaultLocale = "th"

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language")
  if (!acceptLanguage) return defaultLocale

  const headers = { "accept-language": acceptLanguage }
  const languages = new Negotiator({ headers }).languages()

  return match(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)
  const locale = getLocale(request)
  if (!isPathnameHasLocale) {
    request.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
  }
  const response = NextResponse.next();
  response.headers.set("x-current-path", pathname);

  return response;

}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$|.*\\.webp$|.*\\.png$|.*\\.jpg$).*)"
  ]
}