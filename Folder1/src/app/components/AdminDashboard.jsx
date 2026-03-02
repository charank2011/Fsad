import { useState, useEffect } from 'react';
import { Users, Package, ShoppingBag, TrendingUp, UserCheck, UserX } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

export function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load mock users data
    const mockUsers = [
      { id: '1', name: 'Ramayya', email: 'ramayya@example.com', role: 'farmer', status: 'active', joinedDate: '2024-01-15' },
      { id: '2', name: 'Suresh Kumar', email: 'suresh@example.com', role: 'farmer', status: 'active', joinedDate: '2024-02-10' },
      { id: '3', name: 'Priya Sharma', email: 'priya@example.com', role: 'buyer', status: 'active', joinedDate: '2024-01-20' },
      { id: '4', name: 'Rajesh Patel', email: 'rajesh@example.com', role: 'buyer', status: 'active', joinedDate: '2024-03-05' },
      { id: '5', name: 'Lakshmi Reddy', email: 'lakshmi@example.com', role: 'farmer', status: 'inactive', joinedDate: '2023-12-01' },
      { id: '6', name: 'Anil Verma', email: 'anil@example.com', role: 'buyer', status: 'active', joinedDate: '2024-02-28' },
    ];
    setUsers(mockUsers);
  }, []);

  const platformData = [
    { month: 'Jan', farmers: 45, buyers: 120, transactions: 340 },
    { month: 'Feb', farmers: 52, buyers: 145, transactions: 425 },
    { month: 'Mar', farmers: 61, buyers: 168, transactions: 510 },
    { month: 'Apr', farmers: 73, buyers: 195, transactions: 645 },
    { month: 'May', farmers: 85, buyers: 230, transactions: 780 },
    { month: 'Jun', farmers: 98, buyers: 265, transactions: 920 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 61000 },
    { month: 'Apr', revenue: 73000 },
    { month: 'May', revenue: 85000 },
    { month: 'Jun', revenue: 98000 },
  ];

  const stats = [
    { label: 'Total Users', value: users.length.toString(), icon: Users, color: 'blue' },
    { label: 'Active Farmers', value: users.filter(u => u.role === 'farmer' && u.status === 'active').length.toString(), icon: Package, color: 'emerald' },
    { label: 'Active Buyers', value: users.filter(u => u.role === 'buyer' && u.status === 'active').length.toString(), icon: ShoppingBag, color: 'purple' },
    { label: 'Total Transactions', value: '920', icon: TrendingUp, color: 'orange' },
  ];

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage platform users and monitor activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Growth Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="farmers" fill="#10b981" name="Farmers" />
              <Bar dataKey="buyers" fill="#8b5cf6" name="Buyers" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2} name="Revenue (₹)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:w-64"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">User</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Role</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Joined</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === 'farmer' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {user.role === 'farmer' ? 'Farmer' : 'Buyer'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {user.status === 'active' ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(user.joinedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleUserStatus(user.id)}
                    >
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
