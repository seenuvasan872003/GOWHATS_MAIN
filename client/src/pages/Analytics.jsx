import React, { useState } from 'react';
import { 
  ShoppingBag, Bell, TrendingUp, ArrowUpRight, ArrowDownRight,
  Package, Users, DollarSign, Truck, ShoppingCart,
  BarChart3, Box, Star, RefreshCcw, Tag, Calendar,
  AlertTriangle, CheckCircle2
} from 'lucide-react';
import StatCard from "../components/StatCard";
import OrderRow from "../components/OrderRow"


// Add inventory status and price to each product
const productInventory = {
  "Organic Cotton T-shirt": { stock: 150, status: "in_stock", price: 899 },
  "Eco-friendly Water Bottle": { stock: 85, status: "in_stock", price: 599 },
  "Bamboo Toothbrush": { stock: 15, status: "low_stock", price: 199 },
  "Reusable Coffee Cup": { stock: 0, status: "out_of_stock", price: 699 },
  "Hemp Face Mask": { stock: 200, status: "in_stock", price: 299 },
  "Organic Soap Bar": { stock: 10, status: "low_stock", price: 249 },
  "Sustainable Yoga Mat": { stock: 45, status: "in_stock", price: 1499 },
  "Reusable Produce Bags": { stock: 0, status: "out_of_stock", price: 399 },
  "Natural Deodorant": { stock: 75, status: "in_stock", price: 449 }
};

// Monthly data simulation with all months
const monthlyData = {
  January: {
    totalSales: 24780,
    activeCustomers: 547,
    pendingOrders: 14,
    deliveries: 28,
    cartConversion: 68,
    returnRate: 2.4,
    avgRating: 4.8,
    activePromos: 8,
    orders: [
      { id: "ORD-2024-001", product: "Organic Cotton T-shirt", quantity: 45, amount: 1605, percentage: 15 },
      { id: "ORD-2024-002", product: "Eco-friendly Water Bottle", quantity: 32, amount: 640, percentage: 12 },
      { id: "ORD-2024-003", product: "Bamboo Toothbrush", quantity: 25, amount: 535, percentage: 8 }
    ]
  },
  February: {
    totalSales: 28950,
    activeCustomers: 612,
    pendingOrders: 18,
    deliveries: 32,
    cartConversion: 72,
    returnRate: 2.1,
    avgRating: 4.9,
    activePromos: 6,
    orders: [
      { id: "ORD-2024-004", product: "Reusable Coffee Cup", quantity: 58, amount: 1850, percentage: 18 },
      { id: "ORD-2024-005", product: "Hemp Face Mask", quantity: 40, amount: 720, percentage: 14 },
      { id: "ORD-2024-006", product: "Organic Soap Bar", quantity: 35, amount: 595, percentage: 10 }
    ]
  },
  March: {
    totalSales: 31240,
    activeCustomers: 635,
    pendingOrders: 16,
    deliveries: 35,
    cartConversion: 75,
    returnRate: 2.0,
    avgRating: 4.9,
    activePromos: 7,
    orders: [
      { id: "ORD-2024-007", product: "Sustainable Yoga Mat", quantity: 62, amount: 2170, percentage: 20 },
      { id: "ORD-2024-008", product: "Reusable Produce Bags", quantity: 48, amount: 960, percentage: 15 },
      { id: "ORD-2024-009", product: "Natural Deodorant", quantity: 38, amount: 722, percentage: 12 }
    ]
  },
  April: {
    totalSales: 29870,
    activeCustomers: 598,
    pendingOrders: 15,
    deliveries: 30,
    cartConversion: 70,
    returnRate: 2.2,
    avgRating: 4.8,
    activePromos: 5,
    orders: [
      { id: "ORD-2024-010", product: "Bamboo Cutlery Set", quantity: 55, amount: 1925, percentage: 19 },
      { id: "ORD-2024-011", product: "Zero Waste Starter Kit", quantity: 42, amount: 840, percentage: 16 },
      { id: "ORD-2024-012", product: "Organic Lip Balm", quantity: 30, amount: 450, percentage: 11 }
    ]
  },
  May: {
    totalSales: 32560,
    activeCustomers: 645,
    pendingOrders: 19,
    deliveries: 36,
    cartConversion: 73,
    returnRate: 2.3,
    avgRating: 4.7,
    activePromos: 8,
    orders: [
      { id: "ORD-2024-013", product: "Stainless Steel Straws", quantity: 65, amount: 1950, percentage: 21 },
      { id: "ORD-2024-014", product: "Organic Cotton Bags", quantity: 45, amount: 900, percentage: 17 },
      { id: "ORD-2024-015", product: "Natural Shampoo Bar", quantity: 33, amount: 627, percentage: 13 }
    ]
  },
  June: {
    totalSales: 30890,
    activeCustomers: 615,
    pendingOrders: 17,
    deliveries: 33,
    cartConversion: 71,
    returnRate: 2.2,
    avgRating: 4.8,
    activePromos: 6,
    orders: [
      { id: "ORD-2024-016", product: "Eco-friendly Lunch Box", quantity: 58, amount: 1740, percentage: 18 },
      { id: "ORD-2024-017", product: "Bamboo Dish Brush", quantity: 43, amount: 860, percentage: 15 },
      { id: "ORD-2024-018", product: "Natural Hand Soap", quantity: 36, amount: 684, percentage: 12 }
    ]
  },
  July: {
    totalSales: 33450,
    activeCustomers: 658,
    pendingOrders: 20,
    deliveries: 38,
    cartConversion: 74,
    returnRate: 2.1,
    avgRating: 4.9,
    activePromos: 9,
    orders: [
      { id: "ORD-2024-019", product: "Reusable Food Wrap", quantity: 68, amount: 2040, percentage: 22 },
      { id: "ORD-2024-020", product: "Natural Sunscreen", quantity: 47, amount: 940, percentage: 18 },
      { id: "ORD-2024-021", product: "Bamboo Hairbrush", quantity: 39, amount: 741, percentage: 14 }
    ]
  },
  August: {
    totalSales: 31780,
    activeCustomers: 628,
    pendingOrders: 16,
    deliveries: 34,
    cartConversion: 72,
    returnRate: 2.3,
    avgRating: 4.8,
    activePromos: 7,
    orders: [
      { id: "ORD-2024-022", product: "Zero Waste Dental Kit", quantity: 60, amount: 1800, percentage: 19 },
      { id: "ORD-2024-023", product: "Organic Cotton Napkins", quantity: 44, amount: 880, percentage: 16 },
      { id: "ORD-2024-024", product: "Natural Face Cream", quantity: 37, amount: 703, percentage: 13 }
    ]
  },
  September: {
    totalSales: 32890,
    activeCustomers: 642,
    pendingOrders: 18,
    deliveries: 36,
    cartConversion: 73,
    returnRate: 2.2,
    avgRating: 4.8,
    activePromos: 8,
    orders: [
      { id: "ORD-2024-025", product: "Sustainable Phone Case", quantity: 63, amount: 1890, percentage: 20 },
      { id: "ORD-2024-026", product: "Reusable Makeup Pads", quantity: 46, amount: 920, percentage: 17 },
      { id: "ORD-2024-027", product: "Natural Bug Spray", quantity: 38, amount: 722, percentage: 14 }
    ]
  },
  October: {
    totalSales: 34560,
    activeCustomers: 672,
    pendingOrders: 21,
    deliveries: 39,
    cartConversion: 75,
    returnRate: 2.0,
    avgRating: 4.9,
    activePromos: 10,
    orders: [
      { id: "ORD-2024-028", product: "Bamboo Travel Utensils", quantity: 70, amount: 2100, percentage: 23 },
      { id: "ORD-2024-029", product: "Zero Waste Gift Set", quantity: 49, amount: 980, percentage: 19 },
      { id: "ORD-2024-030", product: "Natural Hand Cream", quantity: 40, amount: 760, percentage: 15 }
    ]
  },
  November: {
    totalSales: 33240,
    activeCustomers: 655,
    pendingOrders: 19,
    deliveries: 37,
    cartConversion: 74,
    returnRate: 2.1,
    avgRating: 4.8,
    activePromos: 9,
    orders: [
      { id: "ORD-2024-031", product: "Eco-friendly Notebook", quantity: 66, amount: 1980, percentage: 21 },
      { id: "ORD-2024-032", product: "Natural Body Scrub", quantity: 48, amount: 960, percentage: 18 },
      { id: "ORD-2024-033", product: "Bamboo Cotton Swabs", quantity: 39, amount: 741, percentage: 15 }
    ]
  },
  December: {
    totalSales: 35780,
    activeCustomers: 685,
    pendingOrders: 22,
    deliveries: 40,
    cartConversion: 76,
    returnRate: 1.9,
    avgRating: 4.9,
    activePromos: 11,
    orders: [
      { id: "ORD-2024-034", product: "Holiday Gift Bundle", quantity: 72, amount: 2160, percentage: 24 },
      { id: "ORD-2024-035", product: "Sustainable Ornaments", quantity: 50, amount: 1000, percentage: 20 },
      { id: "ORD-2024-036", product: "Natural Room Spray", quantity: 41, amount: 779, percentage: 16 }
    ]
  }
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


function Analytics() {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const currentMonthData = monthlyData[selectedMonth];

  const totalMonthlyAmount = currentMonthData.orders.reduce((sum, order) => sum + order.amount, 0);
  const totalProductsSold = currentMonthData.orders.reduce((sum, order) => sum + order.quantity, 0);

  // Sort products by quantity for top sellers
  const sortedProducts = [...currentMonthData.orders].sort((a, b) => b.quantity - a.quantity);
  const topProducts = sortedProducts.slice(0, 3);
  
  // Get inventory status counts
  const inventoryStatus = Object.values(productInventory).reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  // Get low stock and out of stock product names
  const lowStockProducts = Object.entries(productInventory)
    .filter(([_, data]) => data.status === 'low_stock')
    .map(([name]) => name);

  const outOfStockProducts = Object.entries(productInventory)
    .filter(([_, data]) => data.status === 'out_of_stock')
    .map(([name]) => name);

  const totalProducts = Object.keys(productInventory).length;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-sm text-green-600 mt-1">Real-time sales monitoring</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="appearance-none bg-white border border-green-100 rounded-lg py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
            </div>
            <button className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow relative">
              <Bell className="w-5 h-5 text-green-600" />
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white"></span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            label="Total Sales" 
            value={`₹${currentMonthData.totalSales.toLocaleString()}`}
            icon={DollarSign}
            trend="up"
            trendValue="15%"
          />
          <StatCard 
            label="Active Customers" 
            value={currentMonthData.activeCustomers}
            icon={Users}
            trend="up"
            trendValue="12%"
          />
          <StatCard 
            label="Pending Orders" 
            value={currentMonthData.pendingOrders}
            icon={Package}
            trend="down"
            trendValue="3%"
          />
          <StatCard 
            label="Out for Delivery" 
            value={currentMonthData.deliveries}
            icon={Truck}
            trend="up"
            trendValue="7%"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-green-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Metrics</h2>
            <div className="sm:grid grid-cols-2 gap-4">
              <div className="flex mb-5 sm:mb-0 items-center space-x-3 p-4 bg-white rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-all">
                <div className="p-2 bg-green-50 rounded-lg">
                  <ShoppingCart className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-green-600">Cart Conversion Rate</div>
                  <div className="text-lg font-semibold">{currentMonthData.cartConversion}%</div>
                </div>
              </div>
              <div className="flex mb-5 sm:mb-0 items-center space-x-3 p-4 bg-white rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-all">
                <div className="p-2 bg-green-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-green-600">Total Products</div>
                  <div className="text-lg font-semibold">{totalProducts}</div>
                </div>
              </div>
              <div className="flex mb-5 sm:mb-0 items-center space-x-3 p-4 bg-white rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-all">
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <div className="text-sm text-yellow-600">Low Stock Items</div>
                  <div className="text-xs font-medium mt-1">
                    {lowStockProducts.join(', ')}
                  </div>
                </div>
              </div>
              <div className="flex mb-5 sm:mb-0 items-center space-x-3 p-4 bg-white rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-all">
                <div className="p-2 bg-red-50 rounded-lg">
                  <Box className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <div className="text-sm text-red-600">Out of Stock Items</div>
                  <div className="text-xs font-medium mt-1">
                    {outOfStockProducts.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-green-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Monthly Performance</h2>
              <BarChart3 className="w-5 h-5 text-green-500" />
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <div className="w-8 h-8 flex items-center justify-center font-bold text-green-700">
                        #{index + 1}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">{product.product}</div>
                      <div className="text-sm text-green-600">
                        {product.quantity} units sold
                      </div>
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    ₹{product.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-green-100">
          <div className="px-6 py-5 border-b border-green-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Monthly Product Sales</h2>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-green-500">{selectedMonth} Sales</span>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-green-200">
              <thead className="bg-green-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
                    Share
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-green-200">
                {currentMonthData.orders.map(order => (
                  <OrderRow 
                    key={order.id}
                    orderId={order.id}
                    product={order.product}
                    quantity={order.quantity}
                    amount={order.amount}
                    percentage={order.percentage}
                  />
                ))}
                <tr className="bg-green-50">
                  <td colSpan={2} className="px-6 py-4 text-right font-semibold text-gray-900">
                    Total Monthly Sales:
                  </td>
                  <td colSpan={2} className="px-6 py-4 font-bold text-gray-900">
                    ₹{totalMonthlyAmount.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-sm overflow-hidden border border-green-100">
          <div className="px-6 py-5 border-b border-green-100">
            <h2 className="text-lg font-semibold text-gray-900">Product Inventory Status</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-green-200">
              <thead className="bg-green-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
                    Stock Level
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-green-200">
                {Object.entries(productInventory).map(([product, data]) => (
                  <tr key={product} className="hover:bg-green-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.stock} units
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{data.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        data.status === 'in_stock' 
                          ? 'bg-green-100 text-green-800'
                          : data.status === 'low_stock'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {data.status === 'in_stock' 
                          ? 'In Stock'
                          : data.status === 'low_stock'
                          ? 'Low Stock'
                          : 'Out of Stock'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-green-600">
          <p>SMS Notifications Cost: ₹330.60</p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;