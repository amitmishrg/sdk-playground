import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { AI } from './ai';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'sdk-playground',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AI>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
        >
          <nav className="border-b border-zinc-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm w-full z-10 mb-4">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-zinc-800 dark:text-white">
                  AI Chat Demo
                </div>
                <ul className="flex space-x-2">
                  <li>
                    <Link
                      href={'basic'}
                      className="px-2 py-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors duration-200"
                    >
                      Basic
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={'/generative'}
                      className="px-2 py-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors duration-200"
                    >
                      Generative
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={'/completion'}
                      className="px-2 py-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors duration-200"
                    >
                      Completion
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={'/notifications'}
                      className="px-2 py-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors duration-200"
                    >
                      Notifications
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={'/streaming'}
                      className="px-2 py-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors duration-200"
                    >
                      Streaming React Components
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {children}
        </body>
      </html>
    </AI>
  );
}
