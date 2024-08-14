import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { stores } from '@/components/dashboard/types';

export default function Deployments() {
  return (
    <main className="flex  flex-col gap-4 p-6 overflow-y-scroll h-[90vh] ">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold">Deployments</h1>
        <p className="text-sm ">Manage your deployments</p>
      </div>
      <div className="grid gap-6 grid-cols-3 w-full ">
        {stores.map((store) => (
          <div
            className="flex flex-col rounded-xl border p-4 shadow-sm"
            key={store.name}
          >
            <CardTitle className="text-lg">{store.name}</CardTitle>
            <CardDescription className="text-xs">
              {store.address}
            </CardDescription>
            <div className="flex flex-col justify-end h-full">
              <div className="flex flex-col gap-2 w-full pt-2">
                <Image
                  src={store.image}
                  alt="Store"
                  width={400}
                  height={100}
                  className="border border-neutral-300 rounded-sm"
                />
              </div>
              <div className="flex gap-2  pt-3 flex-col sm:flex-col">
                <Button variant="default" size="sm">
                  View
                </Button>
                <Button variant="default" size="sm">
                  Analytics
                </Button>
              </div>
            </div>
          </div>
        ))}
        <Card>
          <div className="flex flex-col h-full items-center justify-center gap-2">
            <CardTitle className="text-lg">Add Store</CardTitle>

            <Button variant="default" size="sm">
              Contact Sales
            </Button>
          </div>{' '}
        </Card>
      </div>
    </main>
  );
}
