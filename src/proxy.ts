import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/final_14(.*)",
  "/store_14",
  "/store_14/products_14(.*)",
  "/store_14/about_14",
  "/api/store_14/confirm",
]);

const isAdminRoute = createRouteMatcher(["/store_14/admin_14(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (req.headers.has("x-middleware-subrequest")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId } = await auth();
  const isAdminUser = Boolean(userId) && userId === process.env.ADMIN_USER_ID;

  // ① 非管理員進 admin 頁 → 踢回首頁
  if (isAdminRoute(req) && !isAdminUser) {
    return NextResponse.redirect(new URL("/store_14", req.url));
  }
  // ② 非公開路徑 → 強制登入
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
