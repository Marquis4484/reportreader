import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
// import { IBM_Plex_Serif, Mona_Sans} from "next/font/google";

import Navbar from "@/components/Navbar";
import "./globals.css";
// import {Toaster} from "@/components/ui/sonner";

// const ibmPlexSerif = IBM_Plex_Serif({
//     variable: "--font-ibm-plex-serif",
//     subsets: ['latin'],
//     weight: ['400', '500', '600', '700'],
//     display: 'swap'
// });

// const monaSans = Mona_Sans({
//     variable: '--font-mona-sans',
//     subsets: ['latin'],
//     display: 'swap'
// })

export const metadata: Metadata = {
  title: "Report Reader",
  description: "An app that aims to speed up your research by enabling AI to skim through your reading material!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

        <html lang="en">
          <body
            className="relative font-sans antialiased"
          >
            <ClerkProvider>
              <Navbar />
              {children}
            </ClerkProvider>
       
          </body>
        </html>
   
  );
}
