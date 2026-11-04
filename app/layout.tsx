import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { MobileNavProvider } from "@/components/layout/MobileNavContext";
import AppShell from "@/components/layout/AppShell";
import PWARegistration from "@/components/common/PWARegistration";

export const metadata: Metadata = {
  title: "HOMIQ — Smart Property CRM (SaaS Platform)",
  description: "Platform CRM B2B Multi-Tenant untuk Developer Perumahan dan Agensi Properti dengan Row-Locking Anti Double-Booking.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-slate-50 text-slate-800 min-h-screen flex antialiased selection:bg-blue-600 selection:text-white">
        <MobileNavProvider>
          <ToastProvider>
            <PWARegistration />
            <AppShell>
              {children}
            </AppShell>
          </ToastProvider>
        </MobileNavProvider>
      </body>
    </html>
  );
}
