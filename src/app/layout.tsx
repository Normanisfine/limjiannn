import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
export const metadata: Metadata = {
  title: "Mingjian Li | Portfolio",
  description: "Portfolio of Mingjian Li - Software Engineer & Researcher",
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐱</text></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
 return <html lang="en"><head><link rel="preload" href="/fonts/outfit-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/></head><body><a className="skip-link" href="#main">Skip to content</a><Navbar/>{children}</body></html>;
}
