import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import AdminLayout from '../../components/AdminLayout';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredLeads(leads);
    } else {
      setFilteredLeads(leads.filter(lead => lead.goal === filter));
    }
  }, [filter, leads]);

  const fetchLeads = async () => {
    try {
      const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const leadsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLeads(leadsData);
      setFilteredLeads(leadsData);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <p className="text-xl">Loading leads...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">Leads Management</h2>
          <div className="flex items-center space-x-4">
            <label className="font-semibold text-gray-700">Filter by Goal:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            >
              <option value="All">All</option>
              <option value="Weight Loss">Weight Loss</option>
              <option value="Fitness">Fitness</option>
              <option value="Energy">Energy</option>
            </select>
          </div>
        </div>

        {filteredLeads.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600 text-lg">No leads found</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Phone</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Goal</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-t hover:bg-gray-50">
                      <td className="py-4 px-6 font-medium">{lead.name}</td>
                      <td className="py-4 px-6">{lead.phone}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          lead.goal === 'Weight Loss' ? 'bg-red-100 text-red-800' :
                          lead.goal === 'Fitness' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {lead.goal}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {lead.createdAt?.toDate().toLocaleDateString()}
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

export default Leads;
