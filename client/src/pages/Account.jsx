import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-28 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">John Doe</h2>
              <p className="text-muted-foreground">john@example.com</p>
            </div>
          </div>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john@example.com" />
            </div>
            <Button className="w-full">Save Changes</Button>
          </form>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Order History</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg border bg-muted/40 p-4">
              <div className="space-y-1">
                <p className="font-medium">Order #12345</p>
                <p className="text-sm text-muted-foreground">
                  Placed on June 15, 2023
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <PackageIcon className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">2 items</span>
                </div>
                <Link
                  href="#"
                  className="text-sm text-primary"
                  prefetch={false}
                >
                  View Order
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg border bg-muted/40 p-4">
              <div className="space-y-1">
                <p className="font-medium">Order #54321</p>
                <p className="text-sm text-muted-foreground">
                  Placed on April 22, 2023
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <PackageIcon className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">5 items</span>
                </div>
                <Link
                  href="#"
                  className="text-sm text-primary"
                  prefetch={false}
                >
                  View Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PackageIcon(props) {
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
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}
