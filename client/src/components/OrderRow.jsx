import React from 'react';
import { 
    ShoppingBag, 
} from 'lucide-react';

const OrderRow = ({ orderId, product, quantity, amount, percentage }) => (
    <tr className="hover:bg-green-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-200 to-green-300 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-green-700" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">#{orderId}</div>
            <div className="text-sm text-gray-500">{product}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{quantity} units</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{amount.toLocaleString()}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {percentage}%
        </span>
      </td>
    </tr>
  );
  export default OrderRow;