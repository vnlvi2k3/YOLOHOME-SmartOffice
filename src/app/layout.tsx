import "regenerator-runtime/runtime";

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ControlContextProvider from "./context/controlContext";
import AuthContextProvider from "./context/authContext";
import NumberStateContextProvider from "./context/numberStateContext";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "Smart Office PWA";
const APP_DEFAULT_TITLE = "Smart Office";
const APP_TITLE_TEMPLATE = "%s - PWA";
const APP_DESCRIPTION =
  "The Smart Office App is an advanced, user-friendly application designed to help you effortlessly manage and monitor your office environment. By leveraging cutting-edge technology and real-time data, this app ensures optimal growing conditions for your plants, leading to healthier crops and increased yields.";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    startupImage: ["./logo.png"],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#A8E065",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
      <NumberStateContextProvider>
        <ControlContextProvider>
          <html lang="en">
            <body
              className={
                inter.className + " overflow-scroll lg:overflow-hidden"
              }
            >
              {children}
            </body>
          </html>
        </ControlContextProvider>
      </NumberStateContextProvider>
    </AuthContextProvider>
  );
}
