import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import Image from "next/image";
import AuthButton from "@/components/header-auth";


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "SBDV LMS Dashboard",
  description: "Dashboard of The Learning Management System of Sri Bodhiraja Dhamma School",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="SBDV" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="max-h-screen flex flex-col items-center">
            <div className="w-full flex flex-col items-center">
              <nav className="sticky top-0 left-0 w-full flex justify-between border-b border-b-foreground/10 h-16 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="w-full flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-3 items-center font-semibold">
                  <Image
                  src={"/logo.webp"}
                  alt="SBDV Logo"
                  width={30}
                  height={50}
                   />
                    <Link href={"/"} className="text-xl">Dashboard of LMS</Link>
                  </div>
                  <AuthButton />
                </div>
              </nav>

              <div className="flex p-5 h-full z-10">
                {children}
              </div>

              <footer className="sticky bottom-0 left-0 h-16 w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-8 px-5 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
                <p>
                  Developed by{" "}
                  <a
                    href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    Nethaka De Saram
                  </a>
                </p>
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}