import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "./Components/providers/ConvexClientProvider";
import Footer from "./Components/footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sufi_Codes",
  keywords: [
    "Sufi_Codes",
    "Code Snippets",
    "Code Sharing",
    "Programming",
    "Developer Tools",
    "AI Code Assistant",
    "Code Collaboration",
    "Code Execution",
    "Code Debugging",
    "Code Review",
    "Code Management",
    "Code Search",
    "Code Organization",
    "Code Versioning",
    "Code Snippet Management",
    "Code Snippet Sharing",
    "online code editor",
    "code editor",
    "code playground",
    "javascript code editor",
    "python code editor",
    "typescript code editor",
    "c++ code editor",
    "java code editor",
    "c# code editor",
    "ruby code editor",
    "php code editor",
    "go code editor",
    "rust code editor",
    "swift code editor",
    "kotlin code editor",
    "code snippet",
    "online javascript editor",
    "online python editor",
    "online typescript editor",
    "online c++ editor",
    "online java editor",
    "online c# editor",
    "online ruby editor",
    "online php editor",
    "online go editor",
    "online rust editor",
    "online swift editor",
    "online kotlin editor",
  ],
  authors: [
    {
      name: "Sufi Codes",
      url: "https://suficodes.com",
    },
  ],
  description: "Sufi_Codes is a powerful online code editor and snippet management tool that allows developers to write, share, and execute code snippets in various programming languages. With features like AI code assistance, code collaboration, and real-time execution, Sufi_Codes enhances your coding experience and productivity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased` }
        suppressHydrationWarning={true}
        >
          <ConvexClientProvider>
        {children}
        </ConvexClientProvider>
        <Footer/>
        <Toaster/>
      </body>
    </html>
  );
}
