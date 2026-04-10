import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware((context, next) => {
  const isLoggedIn = context.cookies.get("auth")?.value === "true";

  const protectedPaths = ["/admin/send-email", "/admin/events"];
  if (
    protectedPaths.some((path) => context.url.pathname.startsWith(path)) &&
    !isLoggedIn
  ) {
    return context.redirect("/admin");
  }

  return next();
});
