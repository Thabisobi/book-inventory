import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Dashboard({ books }) {
  const totalQty = books.reduce((sum, b) => sum + Number(b.quantity || 0), 0);
  const totalValue = books.reduce(
    (sum, b) => sum + Number(b.price || 0) * Number(b.quantity || 0),
    0
  );

  const data = books.map(b => ({
    name: b.title,
    stock: Number(b.quantity || 0),
  }));

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">Dashboard</h2>

      <div>
        <p>Total Books in Stock: {totalQty}</p>
        <p>Total Inventory Value: M {totalValue.toFixed(2)}</p>
      </div>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="stock" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;
