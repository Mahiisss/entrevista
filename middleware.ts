import {NextRequest,NextResponse} from "next/server";
import { NextApiRequest } from "next";
import { verifyToken } from "./helpers/authHelpers";
// This function can be marked `async` if using `await` inside
export default async function middleware(request:NextApiRequest) {

  const headers:any = request.headers;
  const header:any = new Headers(headers);
  const token = header.get("token");
  if(token===null){
    return NextResponse.redirect(new URL('/error', request.url))
  }
  else if((await verifyToken(token))===false){
    return NextResponse.redirect(new URL('/error', request.url))
  }
  else{
    NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/posts','/api/myposts'],
}