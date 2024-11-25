"use client";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface pieChartProps{
  balance : number ,
  depositSum  : number ,
   p2pSum : number
}



const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CustomPieChart = ({balance , depositSum , p2pSum}:pieChartProps) => {
// console.log(balance + " " + depositSum + " " + p2pSum)
const data = [
  { name: "Balance", value: balance },
  { name: "Deposited Amount", value: depositSum },
  { name: "P2P Transfers", value: p2pSum },
  { name: "Pending Amount For approval", value: 100 },
];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
