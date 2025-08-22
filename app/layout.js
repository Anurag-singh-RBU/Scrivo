import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const geistSans = Geist({

  variable: "--font-geist-sans",
  subsets: ["latin"],

});

const jetbrainsMono = JetBrains_Mono({

  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',

})

const geistMono = Geist_Mono({

  variable: "--font-geist-mono",
  subsets: ["latin"],

});

export const metadata = {

  title: "Scrivo",
  description: "Project Management Tool",

};

export default function RootLayout({ children }) {

  return (

    <ClerkProvider>
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} antialiased h-screen`}>
        {children}
        <Toaster richColors/>
      </body>
    </html>
    </ClerkProvider>
    
  );

}
