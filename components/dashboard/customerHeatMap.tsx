import React, { useState } from 'react';
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
import { Button } from '../ui/button';
import { Customer, customers } from './types';

const CustomerHeatMap = () => {
  const [selected, setSelected] = useState<Customer | null>(customers[0]);
  const handleSelectChange = (value: string) => {
    const customer = customers.find(
      (customer) => customer.id === parseInt(value)
    );
    setSelected(customer || null);
  };
  return (
    <>
      <Select onValueChange={handleSelectChange}>
        <SelectTrigger className="w-full">
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
      {selected && (
        <div className="w-full">
          <div className="mt-4 w-full">
            {Object.entries(selected)
              .filter(([key, value]) => key !== 'heatmap')
              .map(([key, value]) => (
                <div key={key} className="flex w-full justify-between">
                  <p className="text-sm">
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace(/([A-Z])/g, ' $1')}
                    :
                  </p>
                  <span className="font-bold"> {value}</span>
                </div>
              ))}
          </div>
          {/* <div className="mt-4">
            <div className="text-sm">Heat map</div>
            <Image
              src={selected.heatmap}
              alt="heatmap"
              width={500}
              height={500}
              className="rounded-lg border border-neutral-300 overflow-hidden"
            />
          </div> */}
        </div>
      )}
      <div className="mt-3">
        <Button>View Heatmap</Button>
      </div>
    </>
  );
};

export default CustomerHeatMap;
