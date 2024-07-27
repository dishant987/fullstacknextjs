import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getOrCreateDB from "./models/server/dbSetup";
import getOrCreateStorage from "./models/server/storage.collection";

export async function middleware(request: NextRequest) {
  await Promise.all([getOrCreateDB(), getOrCreateStorage()]);
  return NextResponse.next();
}

export const config = {
  /*mathch all request paths except for the ones that stat with
  if they match this paths the middleaware not run
    - api
    - _next/static/
    - favicon.com
    - next/image

  */

  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
