import { ClerkProvider } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import { Toaster } from "@/components/ui/toaster"

import './globals.css';
import Footer from './_components/all_purpose_component/Footer';

export const metadata = {
  title: 'FitBites',
  description:
    'Your personalized nutrition companion that crafts tailored meal plans, dynamic recipe suggestions, and caloric tracking, empowering you to achieve your health goals effortlessly.',
};

export default function RootLayout({ children }) {

  const NavbarDynamicComponent = dynamic(() => import('@/app/_components/navbar/Navbar'), { ssr: false });

  return (
    <ClerkProvider>
    
      <html lang="en" suppressHydrationWarning>
        
        <body className="min-h-screen bg-gradient-to-tr from-green-100 to-white roboto-mono">
          
          <main className="px-20">
            <NavbarDynamicComponent />
          </main>

          <main className='px-10'>
            {children}
          </main>

          <main className="px-20">
            <Footer />
          </main>

          <Toaster />
        
        </body>


      </html>

    </ClerkProvider>
  );
}
