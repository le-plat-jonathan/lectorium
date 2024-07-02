import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

export default function AccountPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Order History</h1>
            <p className="text-muted-foreground">
              View your past orders and track their status.
            </p>
          </div>
          <div className="space-y-6">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Link to={"#"} className="font-medium" prefetch={false}>
                        #123
                      </Link>
                    </TableCell>
                    <TableCell>2023-04-15</TableCell>
                    <TableCell>
                      <div>Acme Lamp x 2</div>
                      <div>Acme Filters x 1</div>
                    </TableCell>
                    <TableCell className="text-right">$299.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Link to={"#"} className="font-medium" prefetch={false}>
                        #456
                      </Link>
                    </TableCell>
                    <TableCell>2023-03-01</TableCell>
                    <TableCell>
                      <div>Acme Tee x 1</div>
                      <div>Acme Shorts x 1</div>
                    </TableCell>
                    <TableCell className="text-right">$79.98</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Link to={"#"} className="font-medium" prefetch={false}>
                        #789
                      </Link>
                    </TableCell>
                    <TableCell>2023-01-20</TableCell>
                    <TableCell>
                      <div>Acme Backpack x 1</div>
                    </TableCell>
                    <TableCell className="text-right">$49.99</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
