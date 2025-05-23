import './globals.css';
import { QueryProvider } from '@/providers/QueryProvider';
import AuthProvider from '@/providers/AuthProvider';
import { Inter, Montserrat } from 'next/font/google';
import { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'TufanTicket - Event Discovery for Gen Z',
  description: 'Discover personalized events and experiences with AI-powered recommendations',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} dark`}>
      <body className="bg-gray-950 text-gray-200 min-h-screen">
          <AuthProvider>
            <QueryProvider>
              {children}
            </QueryProvider>
          </AuthProvider>
      </body>
    </html>
  );
}