'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export const customers = [
  {
    id: 1,
    gender: 'male',
    timeInStore: '15 mins',
    trolleyType: 'hand trolley',
    accompanied: 'single',
    dressColor: 'blue',
    threatPercentage: '5%',
    heatmap: '/heatmap_frames/frame_1.jpg',
  },
  {
    id: 2,
    gender: 'female',
    timeInStore: '30 mins',
    trolleyType: 'wheel trolley',
    accompanied: 'with someone',
    dressColor: 'red',
    threatPercentage: '3%',
    heatmap: '/heatmap_frames/frame_2.jpg',
  },
  {
    id: 3,
    gender: 'male',
    timeInStore: '45 mins',
    trolleyType: 'none',
    accompanied: 'single',
    dressColor: 'green',
    threatPercentage: '7%',
    heatmap: '/heatmap_frames/frame_3.jpg',
  },
  {
    id: 4,
    gender: 'female',
    timeInStore: '20 mins',
    trolleyType: 'hand trolley',
    accompanied: 'with someone',
    dressColor: 'yellow',
    threatPercentage: '2%',
    heatmap: '/heatmap_frames/frame_4.jpg',
  },
  {
    id: 5,
    gender: 'male',
    timeInStore: '10 mins',
    trolleyType: 'wheel trolley',
    accompanied: 'single',
    dressColor: 'black',
    threatPercentage: '4%',
    heatmap: '/heatmap_frames/frame_5.jpg',
  },
  {
    id: 6,
    gender: 'female',
    timeInStore: '25 mins',
    trolleyType: 'none',
    accompanied: 'with someone',
    dressColor: 'white',
    threatPercentage: '6%',
    heatmap: '/heatmap_frames/frame_6.jpg',
  },
  {
    id: 7,
    gender: 'male',
    timeInStore: '35 mins',
    trolleyType: 'hand trolley',
    accompanied: 'single',
    dressColor: 'blue',
    threatPercentage: '5%',
    heatmap: '/heatmap_frames/frame_7.jpg',
  },
  {
    id: 8,
    gender: 'female',
    timeInStore: '40 mins',
    trolleyType: 'wheel trolley',
    accompanied: 'with someone',
    dressColor: 'red',
    threatPercentage: '3%',
    heatmap: '/heatmap_frames/frame_8.jpg',
  },
  {
    id: 9,
    gender: 'male',
    timeInStore: '50 mins',
    trolleyType: 'none',
    accompanied: 'single',
    dressColor: 'green',
    threatPercentage: '7%',
    heatmap: '/heatmap_frames/frame_9.jpg',
  },
  {
    id: 10,
    gender: 'female',
    timeInStore: '15 mins',
    trolleyType: 'hand trolley',
    accompanied: 'with someone',
    dressColor: 'yellow',
    threatPercentage: '2%',
    heatmap: '/heatmap_frames/frame_10.jpg',
  },
  {
    id: 11,
    gender: 'male',
    timeInStore: '30 mins',
    trolleyType: 'wheel trolley',
    accompanied: 'single',
    dressColor: 'black',
    threatPercentage: '4%',
    heatmap: '/heatmap_frames/frame_11.jpg',
  },
  {
    id: 12,
    gender: 'female',
    timeInStore: '45 mins',
    trolleyType: 'none',
    accompanied: 'with someone',
    dressColor: 'white',
    threatPercentage: '6%',
    heatmap: '/heatmap_frames/frame_12.jpg',
  },
  {
    id: 13,
    gender: 'male',
    timeInStore: '20 mins',
    trolleyType: 'hand trolley',
    accompanied: 'single',
    dressColor: 'blue',
    threatPercentage: '5%',
    heatmap: '/heatmap_frames/frame_13.jpg',
  },
  {
    id: 14,
    gender: 'female',
    timeInStore: '10 mins',
    trolleyType: 'wheel trolley',
    accompanied: 'with someone',
    dressColor: 'red',
    threatPercentage: '3%',
    heatmap: '/heatmap_frames/frame_14.jpg',
  },
  {
    id: 15,
    gender: 'male',
    timeInStore: '25 mins',
    trolleyType: 'none',
    accompanied: 'single',
    dressColor: 'green',
    threatPercentage: '7%',
    heatmap: '/heatmap_frames/frame_15.jpg',
  },
  {
    id: 16,
    gender: 'female',
    timeInStore: '35 mins',
    trolleyType: 'hand trolley',
    accompanied: 'with someone',
    dressColor: 'yellow',
    threatPercentage: '2%',
    heatmap: '/heatmap_frames/frame_16.jpg',
  },
  {
    id: 17,
    gender: 'male',
    timeInStore: '40 mins',
    trolleyType: 'wheel trolley',
    accompanied: 'single',
    dressColor: 'black',
    threatPercentage: '4%',
    heatmap: '/heatmap_frames/frame_17.jpg',
  },
  {
    id: 18,
    gender: 'female',
    timeInStore: '50 mins',
    trolleyType: 'none',
    accompanied: 'with someone',
    dressColor: 'white',
    threatPercentage: '6%',
    heatmap: '/heatmap_frames/frame_18.jpg',
  },
  {
    id: 19,
    gender: 'male',
    timeInStore: '15 mins',
    trolleyType: 'hand trolley',
    accompanied: 'single',
    dressColor: 'blue',
    threatPercentage: '5%',
    heatmap: '/heatmap_frames/frame_19.jpg',
  },
  {
    id: 20,
    gender: 'female',
    timeInStore: '30 mins',
    trolleyType: 'wheel trolley',
    accompanied: 'with someone',
    dressColor: 'red',
    threatPercentage: '3%',
    heatmap: '/heatmap_frames/frame_20.jpg',
  },
  {
    id: 21,
    gender: 'male',
    timeInStore: '45 mins',
    trolleyType: 'none',
    accompanied: 'single',
    dressColor: 'green',
    threatPercentage: '7%',
    heatmap: '/heatmap_frames/frame_21.jpg',
  },
  {
    id: 22,
    gender: 'female',
    timeInStore: '20 mins',
    trolleyType: 'hand trolley',
    accompanied: 'with someone',
    dressColor: 'yellow',
    threatPercentage: '2%',
    heatmap: '/heatmap_frames/frame_22.jpg',
  },
  {
    id: 23,
    gender: 'male',
    timeInStore: '10 mins',
    trolleyType: 'wheel trolley',
    accompanied: 'single',
    dressColor: 'black',
    threatPercentage: '4%',
    heatmap: '/heatmap_frames/frame_23.jpg',
  },
];

export type Customer = {
  id: number;
  gender: string;
  timeInStore: string;
  trolleyType: string;
  accompanied: string;
  dressColor: string;
  threatPercentage: string;
  heatmap: string;
};

export default function Customers() {
  const [selected, setSelected] = useState<Customer | null>(customers[0]);
  const handleSelectChange = (value: string) => {
    const customer = customers.find(
      (customer) => customer.id === parseInt(value)
    );
    setSelected(customer || null);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-bold">Customer</h1>
          <p className="text-sm ">Track all active customers</p>
        </div>
        <div>
          Total Customers: <span className="font-bold">{customers.length}</span>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full">
        <div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                if (selected) {
                  const currentIndex = customers.findIndex(
                    (customer) => customer.id === selected.id
                  );
                  const previousIndex =
                    (currentIndex - 1 + customers.length) % customers.length;
                  setSelected(customers[previousIndex]);
                }
              }}
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                if (selected) {
                  const currentIndex = customers.findIndex(
                    (customer) => customer.id === selected.id
                  );
                  const nextIndex = (currentIndex + 1) % customers.length;
                  setSelected(customers[nextIndex]);
                }
              }}
            >
              Next
            </Button>
          </div>
        </div>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[400px]">
            <SelectValue placeholder="Select a customer" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Customers</SelectLabel>
              {customers.map((customer) => (
                <SelectItem key={customer.id} value={customer.id.toString()}>
                  Customer {customer.id}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 w-full overflow-y-scroll h-[64vh] gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-1">
            {selected ? (
              <>
                <div className="flex justify-between">
                  <strong>ID:</strong> <span>{selected.id}</span>
                </div>
                <div className="flex justify-between">
                  <strong>Gender:</strong> <span>{selected.gender}</span>
                </div>
                <div className="flex justify-between">
                  <strong>Time in Store:</strong>{' '}
                  <span>{selected.timeInStore}</span>
                </div>
                <div className="flex justify-between">
                  <strong>Trolley Type:</strong>{' '}
                  <span>{selected.trolleyType}</span>
                </div>
                <div className="flex justify-between">
                  <strong>Accompanied:</strong>{' '}
                  <span>{selected.accompanied}</span>
                </div>
                <div className="flex justify-between">
                  <strong>Dress Color:</strong>{' '}
                  <span>{selected.dressColor}</span>
                </div>
              </>
            ) : (
              <div>Select a customer to see details</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Threat Percentage</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {selected ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="font-medium">Threat Level</div>
                  <div className="font-medium text-primary">
                    {selected.threatPercentage}
                  </div>
                </div>
                <Progress
                  className="h-4"
                  value={parseInt(selected.threatPercentage)}
                />
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  The current threat level is {selected.threatPercentage}. This
                  indicates a risk based on recent activity and security
                  profile.
                </div>
              </>
            ) : (
              <div>Select a customer to see threat percentage</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            {selected ? (
              <div>
                <Image
                  src={selected.heatmap}
                  alt="heatmap"
                  width={550}
                  height={550}
                  className="rounded-lg border border-neutral-300 overflow-hidden"
                />
              </div>
            ) : (
              <div>Select a customer to see heatmap</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex flex-row gap-2 items-center">
                Live 3D Feed
                <div>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-red-500"
                  >
                    <path
                      fill="currentColor"
                      d="M5.453 4.167a.726.726 0 0 0-1.027-.01A8.23 8.23 0 0 0 2 10a8.23 8.23 0 0 0 2.604 6.015a.725.725 0 0 0 1.01-.025c.316-.316.277-.819-.027-1.11A6.73 6.73 0 0 1 3.5 10c0-1.846.741-3.52 1.943-4.738c.29-.295.32-.785.01-1.095M7.214 5.93a.714.714 0 0 0-1.008-.016A5.73 5.73 0 0 0 4.5 10c0 1.692.73 3.213 1.893 4.265a.713.713 0 0 0 .983-.038c.328-.328.267-.844-.041-1.134A4.24 4.24 0 0 1 6 10c0-1.15.457-2.194 1.2-2.96c.286-.294.333-.793.014-1.111m5.572 0a.714.714 0 0 1 1.008-.016A5.73 5.73 0 0 1 15.5 10c0 1.692-.73 3.213-1.893 4.265a.713.713 0 0 1-.983-.038c-.328-.328-.267-.844.041-1.134A4.24 4.24 0 0 0 14 10c0-1.15-.457-2.194-1.2-2.96c-.286-.294-.333-.793-.014-1.111m1.761-1.762a.726.726 0 0 1 1.027-.01A8.23 8.23 0 0 1 18 10a8.23 8.23 0 0 1-2.604 6.015a.725.725 0 0 1-1.01-.025c-.316-.316-.277-.819.028-1.11A6.73 6.73 0 0 0 16.5 10c0-1.846-.741-3.52-1.943-4.738c-.29-.295-.32-.785-.01-1.095M10 8.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3"
                    />
                  </svg>
                </div>{' '}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Image
                src="/3D_Construct_Shop.jpeg"
                alt="heatmap"
                width={550}
                height={550}
                className="rounded-lg border border-neutral-300 overflow-hidden"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
