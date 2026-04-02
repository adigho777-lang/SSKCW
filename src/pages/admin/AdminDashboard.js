import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import AdminLayout from '../../components/AdminLayout';
import { FaShoppingCart, FaUsers, FaBox } from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalLeads: 0,
    totalProducts: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const ordersSnapshot = await getDocs(collection(db, 'orders'));
      const leadsSnapshot = await getDocs(collection(db, 'leads'));
      const productsSnapshot = await getDocs(collection(db, 'products'));

      setStats({
        totalOrders: ordersSnapshot.size,
        totalLeads: leadsSnapshot.size,
        totalProducts: productsSnapshot.size
      });

      const ordersQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(5));
      const recentOrdersSnapshot = await getDocs(ordersQuery);
      const ordersData = recentOrdersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecentOrders(ordersData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { icon: <FaShoppingCart />, label: 'Total Orders', value: stats.totalOrders, color: 'bg-blue-500' },
    { icon: <FaUsers />, label: 'Total Leads', value: stats.totalLeads, color: 'bg-green-500' },
    { icon: <FaBox />, label: 'Total Products', value: stats.totalProducts, color: 'bg-purple-500' }
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <p className="text-xl">Loading dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{card.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                </div>
                <div className={`${card.color} text-white p-4 rounded-lg text-3xl`}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h3>
          {recentOrders.length === 0 ? (
            <p className="text-gray-600">No orders yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Product</th>
                    <th className="text-left py-3 px-4">Phone</th>
                    <th className="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{order.name}</td>
                      <td className="py-3 px-4">{order.productTitle}</td>
                      <td className="py-3 px-4">{order.phone}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
