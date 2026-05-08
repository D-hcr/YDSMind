'use client';

import { useEffect } from 'react';
import { runAllMigrations } from '@/lib/migrations/runMigrations';

export function MigrationGate({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    runAllMigrations();
  }, []);
  return <>{children}</>;
}
