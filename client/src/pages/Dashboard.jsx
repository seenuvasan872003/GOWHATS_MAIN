import React, { useState, useEffect } from 'react';
import { Send, MessageSquare, Phone, Users, ChevronDown, Calendar } from 'lucide-react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { parseISO, format, differenceInDays, getYear } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement, 
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
);

function StatCard({ icon, label, value, trend }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-green-50 rounded-lg">{icon}</div>
        <span className={`text-sm font-medium ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend >= 0 ? '+' : ''}{trend}%
        </span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}

function Dashboard() {
  const [startDate, setStartDate] = useState('2024-02-01');
  const [endDate, setEndDate] = useState('2024-03-01');
  const [timeRange, setTimeRange] = useState('Last 30 days');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [chartView, setChartView] = useState('yearly');
  const [salesView, setSalesView] = useState('monthly');
  const [revenueData, setRevenueData] = useState(null);
  const [salesData, setSalesData] = useState(null);
  const [statsData, setStatsData] = useState({
    revenue: '₹2.4M',
    users: '14.2K',
    conversion: '4.3%',
    avgOrder: '₹1,200',
    revenueTrend: 12.5,
    usersTrend: 8.1,
    conversionTrend: -2.4,
    avgOrderTrend: 5.7
  });

  // Generate mock data based on date range
  const generateMockData = (start, end) => {
    const days = differenceInDays(parseISO(end), parseISO(start));
    const multiplier = Math.max(0.8 + (days / 30) * 0.2, 0.5);
    const endYear = getYear(parseISO(end));

    // Generate years array for revenue data (6 years ending with end date year)
    const yearlyLabels = Array.from({ length: 6 }, (_, i) => (endYear - 5 + i).toString());
    const yearlyData = yearlyLabels.map((year, index) => {
      const baseValue = 650000 * (1 + index * 0.4); // Increase by 40% each year
      return baseValue * multiplier;
    });

    // Generate years array for sales data (5 years ending with end date year)
    const salesYearlyLabels = Array.from({ length: 5 }, (_, i) => (endYear - 4 + i).toString());
    const salesYearlyData = salesYearlyLabels.map((year, index) => {
      const baseValue = 8500000 * (1 + index * 0.2); // Increase by 20% each year
      return baseValue * multiplier;
    });

    // Update stats
    const newStats = {
      revenue: `₹${(2.4 * multiplier).toFixed(1)}M`,
      users: `${Math.round(14.2 * multiplier)}K`,
      conversion: `${(4.3 * multiplier).toFixed(1)}%`,
      avgOrder: `₹${Math.round(1200 * multiplier)}`,
      revenueTrend: (12.5 * multiplier).toFixed(1),
      usersTrend: (8.1 * multiplier).toFixed(1),
      conversionTrend: (-2.4 * multiplier).toFixed(1),
      avgOrderTrend: (5.7 * multiplier).toFixed(1)
    };

    // Update revenue data
    const newRevenueData = {
      yearly: {
        labels: yearlyLabels,
        datasets: [{
          label: 'Revenue',
          data: yearlyData,
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: '#10B981',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointHoverRadius: 8,
        }]
      },
      weekly: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Revenue',
          data: [75000, 92000, 78000, 95000].map(val => val * multiplier),
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: '#10B981',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointHoverRadius: 8,
        }]
      }
    };

    // Update sales data line chart
    const newSalesData = {
      weekly: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Sales',
          data: [280000, 320000, 290000, 350000].map(val => val * multiplier),
          backgroundColor: 'rgba(16, 185, 129, 0.7)',
          borderRadius: 6,
        }]
      },
      monthly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Sales',
          data: [1200000, 1500000, 1800000, 1600000, 1900000, 2100000].map(val => val * multiplier),
          backgroundColor: 'rgba(16, 185, 129, 0.7)',
          borderRadius: 6,
        }]
      },
      yearly: {
        labels: salesYearlyLabels,
        datasets: [{
          label: 'Sales',
          data: salesYearlyData,
          backgroundColor: 'rgba(16, 185, 129, 0.7)',
          borderRadius: 6,
        }]
      }
    };

    return { stats: newStats, revenueData: newRevenueData, salesData: newSalesData };
  };

  useEffect(() => {
    const { stats, revenueData: newRevenueData, salesData: newSalesData } = generateMockData(startDate, endDate);
    setStatsData(stats);
    setRevenueData(newRevenueData);
    setSalesData(newSalesData);
  }, [startDate, endDate]);

  // Product Distribution Data (static) pie chart
  const productData = {
    labels: ['Electronics', 'Fashion', 'Home', 'Beauty'],
    datasets: [{
      data: [35, 25, 22, 18],
      backgroundColor: [
        '#A1EEBD',
        '#B6FFA1',
        '#A0D683',
        '#D3EE98',
      ],
      borderWidth: 0,
    }],
  };

  const productOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
    },
  };

  // Customer Age Categories Data (static)
  const customerAgeData = {
    labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
    datasets: [
      {
        label: 'Electronics',
        data: [15, 30, 25, 18, 12],
        backgroundColor: '#A1EEBD',
        
      },
      {
        label: 'Fashion',
        data: [25, 35, 20, 15, 5],
        backgroundColor: '#B6FFA1',
        
      },
      {
        label: 'Home',
        data: [10, 20, 30, 25, 15],
        backgroundColor: '#A0D683',
        
      },
      {
        label: 'Beauty',
        data: [30, 25, 20, 15, 10],
        backgroundColor: '#D3EE98',
        
      },
    ],
  };

  const customerAgeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}%`,
        }
      }
    },
    scales: {
      y: {
        stacked: true,
        beginAtZero: true,
        grid: { display: false },
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
      x: {
        stacked: true,
        grid: { display: false },
      },
    },
  };

  const revenueOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        callbacks: {
          label: (context) => `Revenue: ₹${(context.raw/1000).toFixed(1)}k`,
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false },
        ticks: {
          callback: (value) => `₹${value/1000}k`,
        },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  const salesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `Sales: ₹${(context.raw/1000000).toFixed(1)}M`,
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false },
        ticks: {
          callback: (value) => `₹${value/1000000}M`,
        },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  const handleDateFilter = () => {
    setTimeRange(`${format(parseISO(startDate), 'MMM d, yyyy')} - ${format(parseISO(endDate), 'MMM d, yyyy')}`);
    setDropdownOpen(false);
  };

  const handleReset = () => {
    setStartDate('2024-02-01');
    setEndDate('2024-03-01');
    setTimeRange('Last 30 days');
  };

  if (!revenueData || !salesData) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-7">
      {/* Header */}
      <div className=" sm:flex justify-between items-center mb-8">
        <div className='mb-5 sm:mb-0'>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Track your business performance and growth</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Calendar size={18} />
              <span>{timeRange}</span>
              <ChevronDown size={16} />
            </button>
            {dropdownOpen && (
              <div className="absolute -right-10 sm:right-0 mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-10 w-56 sm:w-80">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full rounded-md border border-gray-300 p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full rounded-md border border-gray-300 p-2"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleDateFilter}
                      className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Apply Filter
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={<Send size={20} className="text-green-600" />}
          label="Total Revenue"
          value={statsData.revenue}
          trend={parseFloat(statsData.revenueTrend)}
        />
        <StatCard 
          icon={<Users size={20} className="text-green-600" />}
          label="Active Users"
          value={statsData.users}
          trend={parseFloat(statsData.usersTrend)}
        />
        <StatCard 
          icon={<MessageSquare size={20} className="text-green-600" />}
          label="Conversion Rate"
          value={statsData.conversion}
          trend={parseFloat(statsData.conversionTrend)}
        />
        <StatCard 
          icon={<Phone size={20} className="text-green-600" />}
          label="Avg. Order Value"
          value={statsData.avgOrder}
          trend={parseFloat(statsData.avgOrderTrend)}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trends */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="sm:flex justify-between items-center mb-6">
            <div className='mb-4 sm:mb-0'>
              <h2 className="text-lg font-semibold text-gray-900">Revenue Trends</h2>
              <p className="text-sm text-gray-500">Performance over time</p>
            </div>
            <div className="flex gap-2">
              <button 
                className={`px-3 py-1 text-sm rounded-full ${chartView === 'yearly' ? 'bg-green-50 text-green-600' : 'text-gray-500 hover:bg-gray-50'}`}
                onClick={() => setChartView('yearly')}
              >
                Yearly
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-full ${chartView === 'weekly' ? 'bg-green-50 text-green-600' : 'text-gray-500 hover:bg-gray-50'}`}
                onClick={() => setChartView('weekly')}
              >
                Weekly
              </button>
            </div>
          </div>
          <div className="h-[300px]">
            <Line 
              data={revenueData[chartView]} 
              options={revenueOptions} 
            />
          </div>
        </div>

        {/* Product Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Product Distribution</h2>
            <p className="text-sm text-gray-500">Sales by product category</p>
          </div>
          <div className="h-[300px]">
            <Pie data={productData} options={productOptions} />
          </div>
        </div>

        {/* Sales Overview */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="sm:flex justify-between items-center mb-6">
            <div className='mb-4 sm:mb-0'>
              <h2 className="text-lg font-semibold text-gray-900">Sales Overview</h2>
              <p className="text-sm text-gray-500">Performance analysis</p>
            </div>
            <div className="flex gap-2">
              <button 
                className={`px-3 py-1 text-sm rounded-full ${salesView === 'weekly' ? 'bg-green-50 text-green-600' : 'text-gray-500 hover:bg-gray-50'}`}
                onClick={() => setSalesView('weekly')}
              >
                Weekly
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-full ${salesView === 'monthly' ? 'bg-green-50 text-green-600' : 'text-gray-500 hover:bg-gray-50'}`}
                onClick={() => setSalesView('monthly')}
              >
                Monthly
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-full ${salesView === 'yearly' ? 'bg-green-50 text-green-600' : 'text-gray-500 hover:bg-gray-50'}`}
                onClick={() => setSalesView('yearly')}
              >
                Yearly
              </button>
            </div>
          </div>
          <div className="h-[300px]">
            <Bar data={salesData[salesView]} options={salesOptions} />
          </div>
        </div>

        {/* Top Products Table */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
            <p className="text-sm text-gray-500">Best performing products</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Sales</th>
                  <th className="pb-3">Revenue</th>
                  <th className="pb-3">Growth</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b">
                  <td className="py-3">Smartphone X</td>
                  <td>1,245</td>
                  <td>₹624,500</td>
                  <td className="text-green-500">+12.5%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Laptop Pro</td>
                  <td>876</td>
                  <td>₹788,400</td>
                  <td className="text-green-500">+8.3%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Smart Watch</td>
                  <td>1,890</td>
                  <td>₹567,000</td>
                  <td className="text-red-500">-2.1%</td>
                </tr>
                <tr>
                  <td className="py-3">Wireless Earbuds</td>
                  <td>2,456</td>
                  <td>₹368,400</td>
                  <td className="text-green-500">+15.7%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Age Categories */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Customer Age Categories</h2>
            <p className="text-sm text-gray-500">Product preferences by age group</p>
          </div>
          <div className="h-[300px]">
            <Bar data={customerAgeData} options={customerAgeOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;