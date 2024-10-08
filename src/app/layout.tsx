import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "./components/SessionProvider/SessionWrapper";

export const metadata: Metadata = {
  title: "Login| Signup",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </SessionWrapper>

  );
}
