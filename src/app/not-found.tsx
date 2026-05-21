import Link from "next/link";
import { routing } from "@/i18n/routing";
import "./globals.css";

export default function NotFound() {
  return (
    <html lang={routing.defaultLocale} className="dark">
      <body className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-off-white antialiased">
        <p className="font-mono text-sm text-primary">404</p>
        <h1 className="text-display-sm mt-4">Page not found</h1>
        <Link
          href={`/${routing.defaultLocale}`}
          className="btn-ghost-premium mt-8 px-6 py-3 text-sm"
        >
          Go home
        </Link>
      </body>
    </html>
  );
}
