import Header from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex absolute inset-0 flex-col max-h-screen h-full grow pt-16">
      <div className="flex h-screen border">
        <Sidebar />
        <div className="flex flex-col grow">{children}</div>
      </div>
      <div className="flex items-center justify-center gap-2 group z-30 mx-auto absolute bottom-0 w-full">
        <Link href="/">
          <button className="shadow-lg text-md hover:text-lg shadow-black/40 cursor-pointer transition-all duration-100 rounded-b-none rounded-t-3xl hover:bg-black flex items-center justify-center bg-black hover:h-20 h-16 w-fit text-white p-8 border-2 border-black">
            Ask Michelle
          </button>
        </Link>
      </div>
    </div>
  );
};

export default layout;
