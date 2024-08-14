import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Building2Icon, StoreIcon, UserIcon } from 'lucide-react';

export const stores = [
  {
    name: 'ICA Varnhem',
    address: 'Östra Förstadsgatan 50, 212 12 Malmö',
    image: '/maps/ica_varnhem.png',
  },
  {
    name: 'ICA Kvantum',
    address: 'Norra Kungsgatan 8, 642 37 Flen',
    image: '/maps/ica_kvantum_flen.png',
  },
  {
    name: 'ICA Supermarket',
    address: 'Hornsgatan 146, A-B, 117 28 Stockholm',
    image: '/maps/ica_supermarket_stockholm.png',
  },
  {
    name: 'Stkhlm Warehouse',
    address: 'Tavastgatan 34, 118 24 Stockholm',
    image: '/maps/warehouse.png',
  },
];

export default function Header() {
  return (
    <header className="flex z-50 h-auto w-screen flex-col items-center ">
      {/* <div className="flex items-center justify-center text-xs py-2 w-full h-6 bg-white">
        Application under development
      </div> */}
      <div className="w-full flex flex-row gap-3 items-center justify-between px-8 py-2">
        <div className="flex flex-row gap-2  items-baseline">
          <h2 className="text-2xl font-bold text-start">PREVENTA </h2>
          <div className="text-xs font-normal  items-baseline flex gap-2">
            <div className="rounded w-2 h-2 bg-green-500"></div>
            ver: prod-1.13
            <span className="text-neutral-500">EU-AWS_Server</span>
          </div>
        </div>
        {/* <div className="relative">
          <SearchIcon className="absolute left-3 top-2 h-6 w-6 text-gray-500 dark:text-gray-400" />
          <Input
            className="w-full h-full bg-white shadow-none appearance-none pl-12 dark:bg-gray-950"
            placeholder="Search"
            type="search"
          />
        </div> */}

        <div className="flex flex-row gap-2 items-center">
          <div className="flex flex-row gap-2 items-center">
            {/* <p className="text-sm">Deployment</p> */}
            <Select>
              <SelectTrigger className="w-[320px] h-full rounded-full border border-neutral-500">
                <Building2Icon className="h-5 w-5" />
                <SelectValue placeholder="Select deployment" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Deployments</SelectLabel>
                  {stores.map((store) => (
                    <SelectItem key={store.name} value={store.name}>
                      {store.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-full flex items-center justify-center w-auto px-4 gap-2 h-10 border border-green-500 bg-green-300/70">
            <div className="rounded-full w-3 h-3 bg-green-500"></div>
            Online
          </div>
          {/* <Button
            className="ml-auto h-10 w-10 rounded-full shrink-0 border border-neutral-500"
            size="icon"
            variant="outline"
          >
            <BellIcon className="h-6 w-6" />
            <span className="sr-only">Toggle notifications</span>
          </Button> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="ml-auto h-10 w-10 relative rounded-full shrink-0 border border-neutral-500"
                size="icon"
                variant="outline"
              >
                <BellIcon className="h-6 w-6" />
                <div className="h-3 w-3 bg-red-500 rounded-full absolute top-0 right-0"></div>
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="font-semibold text-red-500">
                    Unusual Activity Detected
                  </span>
                  <span className="text-sm text-gray-500">
                    Aisle 3 - Potential shoplifting
                  </span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="font-semibold text-red-500">
                    Unusual Activity Detected
                  </span>
                  <span className="text-sm text-gray-500">
                    Aisle 9 - Potential shoplifting
                  </span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="font-semibold">Queue Length Warning</span>
                  <span className="text-sm text-gray-500">
                    Checkout area exceeding 10 minutes
                  </span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="font-semibold text-red-500">
                    Unusual Activity Detected
                  </span>
                  <span className="text-sm text-gray-500">
                    Aisle 7 - Potential shoplifting
                  </span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full border shrink-0 border-neutral-500 w-10 h-10 dark:border-gray-800"
                size="icon"
                variant="outline"
              >
                <UserIcon className="h-6 w-6" />
                {/* <Image
                  alt="Avatar"
                  className="rounded-full "
                  height="60"
                  width="60"
                  src="/SnehanPassport.png"
                /> */}
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>{' '}
        </div>
      </div>
    </header>
  );
}

function Package2Icon(props: any) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function SearchIcon(props: any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
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

function BellIcon(props: any) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
