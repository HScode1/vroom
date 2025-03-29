// src/app/(clientspace)/layout.tsx
import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="h-8"></div>
      {children}
      <Footer />
    </>
  );
}