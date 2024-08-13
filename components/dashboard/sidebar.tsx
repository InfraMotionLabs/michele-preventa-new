'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type Tab = 'stores' | 'customers' | 'analytics' | 'settings';

export default function Sidebar() {
  const [tab, setTab] = useState<Tab>('stores');
  const router = useRouter();
  const navItems = [
    { id: 'analytics', label: 'Analytics', Icon: LineChartIcon },
    { id: 'customers', label: 'Customers', Icon: UsersIcon },
  ];

  const navItems2 = [
    { id: 'deployments', label: 'Deployments', Icon: ClipboardListIcon },
    { id: 'settings', label: 'Settings', Icon: SettingsIcon },
  ];

  return (
    <div className="border-r flex flex-col justify-between  border-neutral-400 bg-neutral-50 z-50">
      <div className="flex flex-col items-start text-sm font-medium w-full divide-y divide-neutral-400 border-b border-neutral-400">
        {navItems.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={cn(
              'flex items-center gap-4 w-full text-lg px-6 py-6 text-neutral-500 transition-all focus:bg-neutral-200/80 active:bg-neutral-200/80  hover:text-black',
              tab === id && 'bg-neutral-200/80 text-black'
            )}
            onClick={() => {
              setTab(id as Tab);
              router.push(`/dashboard/${id}`);
            }}
          >
            <Icon className="h-6 w-6" />
            {label}
          </button>
        ))}
      </div>
      <div className="flex flex-col items-start text-sm font-medium w-full border-t border-neutral-400 bg-white divide-y divide-neutral-400">
        {navItems2.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={cn(
              'flex items-center gap-4 w-full text-lg px-6 py-6 text-neutral-500 transition-all focus:bg-neutral-200/80 active:bg-neutral-200/80  hover:text-black',
              tab === id && 'bg-neutral-200/80 text-black'
            )}
            onClick={() => {
              setTab(id as Tab);
              router.push(`/dashboard/${id}`);
            }}
          >
            <Icon className="h-6 w-6" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ClipboardListIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  );
}

function HomeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function LineChartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}

function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
