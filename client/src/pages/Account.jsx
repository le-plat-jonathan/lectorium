import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

export default function AccountPage() {
  const [userData, setUserData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    address: '',
    zip_code: '',
    city: '',
    password: '',
  });

  const [orders, setOrders] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        try {
          const response = await fetch(`http://localhost:8000/routes.php/get_user/${userId}`);
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        try {
          const response = await fetch(`http://localhost:8000/routes.php/get_all_orders/${userId}`);
          const data = await response.json();
          setOrders(data);
        } catch (error) {
          console.error('Failed to fetch orders:', error);
        }
      }
    };
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('user_id');
    if (userId) {
      try {
        const response = await fetch(`http://localhost:8000/routes.php/update_user/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (response.ok) {
          alert('User information updated successfully');
        } else {
          alert(`Failed to update user information: ${data.message}`);
        }
      } catch (error) {
        console.error('Failed to update user data:', error);
        alert('Failed to update user information');
      }
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-28 w-28">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>{userData.firstname} {userData.lastname}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">Mes informations</h2>
            </div>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstname">First Name</Label>
                <Input id="firstname" value={userData.firstname} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname">Last Name</Label>
                <Input id="lastname" value={userData.lastname} onChange={handleChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={userData.email} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="flex items-center">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  value={userData.password} 
                  onChange={handleChange} 
                />
                <Button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"} Password
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={userData.address} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip_code">Zip Code</Label>
              <Input id="zip_code" value={userData.zip_code} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" value={userData.city} onChange={handleChange} />
            </div>
            <Button className="w-full" type="submit">Save Changes</Button>
          </form>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Historique de commandes</h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg border bg-muted/40 p-4">
                <div className="space-y-1">
                  <p className="font-medium">Commande #{order.id}</p>
                  <p className="text-sm text-muted-foreground">Total: {order.total}€</p>
                  <p className="text-sm text-muted-foreground">Commande passée le: {new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Link to="#" className="text-sm text-primary">Voir détails</Link>
                </div>
              </div>
            ))}
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
