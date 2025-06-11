import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   console.log("Middleware", request.nextUrl.pathname);

//   // Modify header
//     const header = headers();
//     header.set("User-Uid", "123456");

//     request.nextUrl.pathname = "/api/data";

//     // Return modified request
//     return request;

// }

export function middleware(request: NextRequest) {
  // Add new request headers
  const requestHeaders = new Headers(request.headers);
  const path = request.nextUrl.pathname;
  const method = request.method;
  requestHeaders.set("path", path);
  requestHeaders.set("method", method);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

// Clone the request headers
// requestHeaders.set("x-hello-from-middleware2", "world!");
// requestHeaders.set("user-agent", "New User Agent override by middleware!");
// requestHeaders.delete("x-from-client");
