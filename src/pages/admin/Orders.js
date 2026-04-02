import React, { useState, useEffect } from 'react';
import { getOrders } from '../../services/api';
import AdminLayout from '../../components/AdminLayout';
import { FaTrash, FaSpinner } from 'react-icons/fa';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getOrders();
      setOrders(Array.isArray(data) ? data : data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    // Note: This requires an API endpoint to update order status
    // You may need to implement PUT /orders/:id on your backend
    console.log('Update order status:', orderId, newStatus);
    alert('Status update requires API endpoint: PUT /orders/:id');
  };

  const handleDelete = async (orderId) => {
    // Note: This requires an API endpoint to delete orders
    // You may need to implement DELETE /orders/:id on your backend
    if (window.confirm('Are you sure you want to delete this order?')) {
      console.log('Delete order:', orderId);
      alert('Delete requires API endpoint: DELETE /orders/:id');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <FaSpinner className="animate-spin text-4xl text-primary mx-auto mb-4" />
          <p className="text-xl">Loading orders...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg inline-block">
            <p className="text-xl mb-4">⚠️ {error}</p>
            <button
              onClick={fetchOrders}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Orders Management</h2>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600 text-lg">No orders yet</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Customer</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Phone</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Product</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Address</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-t hover:bg-gray-50">
                      <td className="py-4 px-6">{order.name}</td>
                      <td className="py-4 px-6">{order.phone}</td>
                      <td className="py-4 px-6">{order.productTitle}</td>
                      <td className="py-4 px-6">{order.address}</td>
                      <td className="py-4 px-6">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center space-x-2"
                        >
                          <FaTrash />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Orders;
