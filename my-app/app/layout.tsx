import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./uicomponent/themeprovider";
import Navbar from "./uicomponent/Navbar";
import  Footer  from "./uicomponent/Footer";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>

          <Navbar />
          {children}
          <Footer/>
        </ThemeProvider>
           
        
       
      </body>
    </html>
  );
}
