import React, { useState, useEffect } from 'react';
import { Add, Search, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/Button';

const Invoicing = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [invoices, setInvoices] = useState(() => {
    // Load saved invoices from localStorage
    const savedInvoices = JSON.parse(localStorage.getItem('draftInvoices') || '[]');
    
    // Combine with default invoices
    const defaultInvoices = [
      {
        id: 1,
        invoiceNumber: "INV-202401-001",
        client: "Acme Corporation",
        email: "Billing@Acme.Com",
        date: "Jan 15, 2024",
        dueDate: "Feb 15, 2024",
        amount: "$6,510.00",
        remainingBalance: "$0.00",
        status: "Paid"
      },
      {
        id: 2,
        invoiceNumber: "INV-202401-002",
        client: "TechStart Inc",
        email: "Finance@Techstart.Com",
        date: "Jan 20, 2024",
        dueDate: "Feb 15, 2024",
        amount: "$3,255.00",
        remainingBalance: "$3,255.00",
        status: "Unpaid"
      },
      {
        id: 3,
        invoiceNumber: "INV-202401-003",
        client: "Global Solutions",
        email: "accounts@globalsolutions.com",
        date: "Jan 25, 2024",
        dueDate: "Feb 25, 2024",
        amount: "$8,750.00",
        remainingBalance: "$4,375.00",
        status: "Unpaid"
      },
      {
        id: 4,
        invoiceNumber: "INV-202401-004",
        client: "Innovation Labs",
        email: "finance@innovationlabs.com",
        date: "Jan 28, 2024",
        dueDate: "Feb 28, 2024",
        amount: "$4,200.00",
        remainingBalance: "$0.00",
        status: "Paid"
      },
      {
        id: 5,
        invoiceNumber: "INV-202401-005",
        client: "Metro Construction",
        email: "billing@metroconstruction.com",
        date: "Jan 30, 2024",
        dueDate: "Mar 02, 2024",
        amount: "$12,500.00",
        remainingBalance: "$12,500.00",
        status: "Unpaid"
      },
      {
        id: 6,
        invoiceNumber: "INV-202401-006",
        client: "Digital Dynamics",
        email: "accounts@digitaldynamics.com",
        date: "Feb 01, 2024",
        dueDate: "Mar 01, 2024",
        amount: "$2,800.00",
        remainingBalance: "$0.00",
        status: "Paid"
      },
      {
        id: 7,
        invoiceNumber: "INV-202401-007",
        client: "Urban Development",
        email: "finance@urbandevelopment.com",
        date: "Feb 05, 2024",
        dueDate: "Mar 05, 2024",
        amount: "$9,600.00",
        remainingBalance: "$9,600.00",
        status: "Unpaid"
      },
      {
        id: 8,
        invoiceNumber: "INV-202401-008",
        client: "Precision Engineering",
        email: "billing@precisioneng.com",
        date: "Feb 08, 2024",
        dueDate: "Mar 08, 2024",
        amount: "$5,450.00",
        remainingBalance: "$2,725.00",
        status: "Unpaid"
      }
    ];
    
    return [...savedInvoices, ...defaultInvoices];
  });


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return { bg: 'bg-green-100', text: 'text-green-800' };
      case 'Unpaid':
        return { bg: 'bg-orange-100', text: 'text-orange-800' };
      case 'Draft':
        return { bg: 'bg-blue-100', text: 'text-blue-800' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800' };
    }
  };

  const handleCreateInvoice = () => {
    navigate('select-client');
  };

  // Function to add new invoice to the list
  const addNewInvoice = (newInvoice: any) => {
    setInvoices(prev => [newInvoice, ...prev]);
  };

  // Refresh invoices from localStorage when component mounts
  useEffect(() => {
    const savedInvoices = JSON.parse(localStorage.getItem('draftInvoices') || '[]');
    const defaultInvoices = [
      {
        id: 1,
        invoiceNumber: "INV-202401-001",
        client: "Acme Corporation",
        email: "Billing@Acme.Com",
        date: "Jan 15, 2024",
        dueDate: "Feb 15, 2024",
        amount: "$6,510.00",
        remainingBalance: "$0.00",
        status: "Paid"
      },
      {
        id: 2,
        invoiceNumber: "INV-202401-002",
        client: "TechStart Inc",
        email: "Finance@Techstart.Com",
        date: "Jan 20, 2024",
        dueDate: "Feb 15, 2024",
        amount: "$3,255.00",
        remainingBalance: "$3,255.00",
        status: "Unpaid"
      },
      {
        id: 3,
        invoiceNumber: "INV-202401-003",
        client: "Global Solutions",
        email: "accounts@globalsolutions.com",
        date: "Jan 25, 2024",
        dueDate: "Feb 25, 2024",
        amount: "$8,750.00",
        remainingBalance: "$4,375.00",
        status: "Unpaid"
      },
      {
        id: 4,
        invoiceNumber: "INV-202401-004",
        client: "Innovation Labs",
        email: "finance@innovationlabs.com",
        date: "Jan 28, 2024",
        dueDate: "Feb 28, 2024",
        amount: "$4,200.00",
        remainingBalance: "$0.00",
        status: "Paid"
      },
      {
        id: 5,
        invoiceNumber: "INV-202401-005",
        client: "Metro Construction",
        email: "billing@metroconstruction.com",
        date: "Jan 30, 2024",
        dueDate: "Mar 02, 2024",
        amount: "$12,500.00",
        remainingBalance: "$12,500.00",
        status: "Unpaid"
      },
      {
        id: 6,
        invoiceNumber: "INV-202401-006",
        client: "Digital Dynamics",
        email: "accounts@digitaldynamics.com",
        date: "Feb 01, 2024",
        dueDate: "Mar 01, 2024",
        amount: "$2,800.00",
        remainingBalance: "$0.00",
        status: "Paid"
      },
      {
        id: 7,
        invoiceNumber: "INV-202401-007",
        client: "Urban Development",
        email: "finance@urbandevelopment.com",
        date: "Feb 05, 2024",
        dueDate: "Mar 05, 2024",
        amount: "$9,600.00",
        remainingBalance: "$9,600.00",
        status: "Unpaid"
      },
      {
        id: 8,
        invoiceNumber: "INV-202401-008",
        client: "Precision Engineering",
        email: "billing@precisioneng.com",
        date: "Feb 08, 2024",
        dueDate: "Mar 08, 2024",
        amount: "$5,450.00",
        remainingBalance: "$2,725.00",
        status: "Unpaid"
      }
    ];
    
    setInvoices([...savedInvoices, ...defaultInvoices]);
  }, []);

  const filteredInvoices = invoices
    .filter(invoice => {
      // Status filter
      if (selectedFilter !== 'All' && invoice.status !== selectedFilter) {
        return false;
      }
      
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          invoice.invoiceNumber.toLowerCase().includes(searchLower) ||
          invoice.client.toLowerCase().includes(searchLower) ||
          invoice.email.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              All Invoices
            </h1>
            <p className="text-gray-600 text-lg">
              Manage And Track All Your Invoices
            </p>
          </div>
          <CustomButton
            leftIcon={<Add />}
            color="#2563eb"
            textColor="#ffffff"
            className="px-6 py-3 rounded-lg font-medium"
            onClick={handleCreateInvoice}
          >
            Create Invoice
          </CustomButton>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* Total Invoices Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[120px] flex flex-col justify-between">
            <h3 className="text-gray-700 font-medium mb-2">Total Invoices</h3>
            <div className="text-2xl font-bold text-gray-900 truncate">{invoices.length}</div>
          </div>

          {/* Paid Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[120px] flex flex-col justify-between">
            <h3 className="text-gray-700 font-medium mb-2">Paid</h3>
            <div className="text-2xl font-bold text-green-600 truncate">{invoices.filter(inv => inv.status === 'Paid').length}</div>
          </div>

          {/* Unpaid Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[120px] flex flex-col justify-between">
            <h3 className="text-gray-700 font-medium mb-2">Unpaid</h3>
            <div className="text-2xl font-bold text-purple-600 truncate">{invoices.filter(inv => inv.status === 'Unpaid').length}</div>
          </div>

          {/* Draft Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[120px] flex flex-col justify-between">
            <h3 className="text-gray-700 font-medium mb-2">Draft</h3>
            <div className="text-2xl font-bold text-blue-600 truncate">{invoices.filter(inv => inv.status === 'Draft').length}</div>
          </div>

          {/* Revenue Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[120px] flex flex-col justify-between relative group">
            <h3 className="text-gray-700 font-medium mb-2">Revenue</h3>
            <div className="text-xl font-bold text-orange-600 truncate">
              $52,965.00
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              Total Revenue: $52,965.00
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>

        {/* Invoice Table Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Table Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Invoices ({filteredInvoices.length})
            </h2>
          </div>

          {/* Search and Filter */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedFilter('All')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedFilter === 'All'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-50 text-blue-600 border border-blue-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedFilter('Paid')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedFilter === 'Paid'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-50 text-blue-600 border border-blue-200'
                  }`}
                >
                  Paid
                </button>
                <button
                  onClick={() => setSelectedFilter('Unpaid')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedFilter === 'Unpaid'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-50 text-blue-600 border border-blue-200'
                  }`}
                >
                  Unpaid
                </button>
                <button
                  onClick={() => setSelectedFilter('Draft')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedFilter === 'Draft'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-50 text-blue-600 border border-blue-200'
                  }`}
                >
                  Draft
                </button>
              </div>
            </div>
          </div>

          {/* Invoice Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
                              <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining Balance</th>
                  </tr>
                </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInvoices.map((invoice) => {
                  const statusColors = getStatusColor(invoice.status);
                  return (
                    <tr 
                      key={invoice.id} 
                      className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                      onClick={() => navigate(`/invoicing/${invoice.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {invoice.invoiceNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{invoice.client}</div>
                          <div className="text-sm text-gray-500">{invoice.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {invoice.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {invoice.dueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 ${statusColors.bg} ${statusColors.text} rounded-full text-xs font-medium`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {invoice.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {invoice.remainingBalance}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoicing; 