'use client';

import { Provider } from 'react-redux';
import store from '../store';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Manifest File */}
        <link rel="manifest" href="/manifest.json" />
        {/* Theme Color for PWA */}
        <meta name="theme-color" content="#000000" />
        {/* Viewport Settings */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* App Name for Mobile Devices */}
        <meta name="apple-mobile-web-app-title" content="NCA Kiosk" />
        <meta name="application-name" content="NCA Kiosk" />
        <meta name="description" content="Modernized kiosk system for NCA cemeteries" />
        {/* Favicon and Icons */}
        <link rel="icon" href="/icons/kiosk_icon_192.png" />
        <link rel="apple-touch-icon" href="/icons/kiosk_icon_512.png" />
      </head>
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
