'use client'
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from './sidebar';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      const role = user.publicMetadata.role as string | undefined;
      if (role !== 'admin') {
        router.push('/');
      }
    } else if (isLoaded && !user) {
      router.push('/sign-in');
    }
  }, [user, isLoaded, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user || user.publicMetadata.role !== 'admin') {
    return <div>Access Denied</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}