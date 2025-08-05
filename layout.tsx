import type {Metadata} from 'next';
import { Cairo, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RAGHAD',
  description: 'موقع الدكتورة رغد الصميدعي',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`dark ${cairo.variable} ${playfairDisplay.variable}`}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
