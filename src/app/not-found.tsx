import Link from "next/link";
import { routing } from "@/i18n/routing";

export default function NotFound() {
  return (
    <html lang={routing.defaultLocale} className="dark">
      <body className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-off-white">
        <p className="font-mono text-sm text-[#e32a39]">404</p>
        <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
        <Link
          href={`/${routing.defaultLocale}`}
          className="mt-8 rounded-full border border-white/15 px-6 py-3 text-sm font-medium transition-colors hover:border-[#e32a39]/40"
        >
          Go home
        </Link>
      </body>
    </html>
  );
}
