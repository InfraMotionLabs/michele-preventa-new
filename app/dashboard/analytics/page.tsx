'use client';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';
import CustomerHeatMap from '@/components/dashboard/customerHeatMap';

const shelves = [
  {
    name: 'Frozen Food',
    traffic: '2,300',
    theftMeter: '3%',
  },
  {
    name: 'Skincare Products',
    traffic: '1,800',
    theftMeter: '4%',
  },
  {
    name: 'Organic Vegetables',
    traffic: '2,700',
    theftMeter: '2%',
  },
  {
    name: 'Beverages',
    traffic: '2,100',
    theftMeter: '3%',
  },
];

export default function Analytics() {
  return (
    <main className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 md:gap-8 p-6 overflow-y-scroll h-[90vh]">
      <Card>
        <CardHeader>
          <CardTitle>Customer Heat Map</CardTitle>
          <CardDescription>
            Visualize customer movement and dwell time within the store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CustomerHeatMap />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Product Engagement Time</CardTitle>
          <CardDescription>
            Track how long customers interact with each product.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart className="aspect-[4/3]" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>SOP Monitoring</CardTitle>
          <CardDescription>
            Ensure store operations are aligned with standard operating
            procedures.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardListIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="font-medium text-sm">Shelf Restocking</span>
              </div>
              <Badge variant="default">Compliant</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardListIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="font-medium text-sm">Checkout Procedure</span>
              </div>
              <Badge variant="default" className="whitespace-nowrap">
                Needs Improvement
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardListIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="font-medium text-sm">Inventory Audit</span>
              </div>
              <Badge variant="outline">Non-Compliant</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Store Performance</CardTitle>
          <CardDescription>
            Key metrics for store operations and customer engagement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="font-medium text-sm">Total Customers</span>
              </div>
              <div className="text-2xl font-bold">12,345</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ActivityIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="font-medium text-sm">Avg. Dwell Time</span>
              </div>
              <div className="text-2xl font-bold">8 min 32 sec</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
          <CardDescription>
            Track the customer journey from entry to purchase.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LineChart className="aspect-[4/3]" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Shelves</CardTitle>
          <CardDescription>
            Identify the most popular and profitable shelves.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shelf</TableHead>
                <TableHead>Traffic</TableHead>
                <TableHead>Theft Meter</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shelves.map((shelf, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{shelf.name}</TableCell>
                  <TableCell>{shelf.traffic}</TableCell>
                  <TableCell>{shelf.theftMeter}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}

function ActivityIcon(props: any) {
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
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  );
}

function BarChart(props: any) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: 'Jan', count: 111 },
          { name: 'Feb', count: 157 },
          { name: 'Mar', count: 129 },
          { name: 'Apr', count: 150 },
          { name: 'May', count: 119 },
          { name: 'Jun', count: 72 },
        ]}
        keys={['count']}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={['#2563eb']}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: '9999px',
            },
            container: {
              fontSize: '12px',
              textTransform: 'capitalize',
              borderRadius: '6px',
            },
          },
          grid: {
            line: {
              stroke: '#f3f4f6',
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
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

function LineChart(props: any) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: 'Desktop',
            data: [
              { x: 'Jan', y: 43 },
              { x: 'Feb', y: 137 },
              { x: 'Mar', y: 61 },
              { x: 'Apr', y: 145 },
              { x: 'May', y: 26 },
              { x: 'Jun', y: 154 },
            ],
          },
          {
            id: 'Mobile',
            data: [
              { x: 'Jan', y: 60 },
              { x: 'Feb', y: 48 },
              { x: 'Mar', y: 177 },
              { x: 'Apr', y: 78 },
              { x: 'May', y: 96 },
              { x: 'Jun', y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: 'point',
        }}
        yScale={{
          type: 'linear',
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={['#2563eb', '#e11d48']}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: '9999px',
            },
            container: {
              fontSize: '12px',
              textTransform: 'capitalize',
              borderRadius: '6px',
            },
          },
          grid: {
            line: {
              stroke: '#f3f4f6',
            },
          },
        }}
        role="application"
      />
    </div>
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
