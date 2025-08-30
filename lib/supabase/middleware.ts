import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isPublic = [
    "/",
    "/sign-in",
    "/sign-up",
    "/robots.txt",
    "/sitemap.xml",
    "/sitemap-0.xml",
  ].includes(request.nextUrl.pathname);

  // ✅ Redirect unauthenticated users away from private pages
  if (!isPublic && !user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // ✅ Redirect authenticated users away from public auth pages
  if (
    user &&
    ["/", "/sign-in", "/sign-up"].includes(request.nextUrl.pathname)
  ) {
    // return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}
