import type { Metadata } from 'next';
import '../styles/globals.css';
import { MigrationGate } from '@/components/MigrationGate';

export const metadata: Metadata = {
  title: 'YDSMind',
  description: 'YDS & YÖKDİL sınav hazırlık platformu',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <MigrationGate>{children}</MigrationGate>
      </body>
    </html>
  );
}
