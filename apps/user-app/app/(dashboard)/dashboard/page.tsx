
import { BarChart, PieChart } from "recharts";
import GreetingUserName from "../../../components/GreetingUserName";
import LineChart from "../../../components/LineChart";
import CustomBarChart from "../../../components/barChart";
import CustomPieChart from "../../../components/pieChart";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { OnRampTransactions } from "../../../components/OnRampTransactions";




async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
      where: {
          userId: Number(session?.user?.id)
      }
  });
  return txns.map(t => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider
  }))
}
async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
      where: {
          userId: Number(session?.user?.id)
      }
  });
  return {
      amount: balance?.amount || 0,
      locked: balance?.locked || 0
  }
}

export default async function () {
  const balance = await getBalance();
    const transactions = await getOnRampTransactions();
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="py-4">
          <GreetingUserName />
        </div>
        <div className="w-1/4 h-1 bg-black mb-6"></div>
        <div className="p-10">
          <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Transfer Statistics */}
            <div className="bg-white p-5 shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold mb-3">Transfer Statistics</h2>
              <LineChart />
            </div>

            {/* Receiving Analytics */}
            <div className="bg-white p-5 shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold mb-3">Receiving Analytics</h2>
              <LineChart />
            </div>

            {/* Revenue Overview */}
            <div className="bg-white p-5 shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold mb-3">Revenue Overview</h2>
              <CustomBarChart />
            </div>

            {/* Monthly Performance */}
            <div className="bg-white p-5 shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold mb-3">Monthly Performance</h2>
              <LineChart />
            </div>

            {/* Recent Transactions */}
            <div className="bg-white p-5 shadow-lg rounded-lg">
            <div className="pt-4 overflow-y-auto h-[350px]">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-white p-5 shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold mb-3">Notifications</h2>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="bg-blue-500 h-2 w-2 rounded-full"></span>
                  <span>Image selection remaining!!!</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-yellow-500 h-2 w-2 rounded-full"></span>
                  <span>Pending approval from bank refund</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-green-500 h-2 w-2 rounded-full"></span>
                  <span>Payment successful for invoice #123</span>
                </li>
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-5 shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600">
                  Add Transaction
                </button>
                <button className="bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600">
                  Generate Report
                </button>
                <button className="bg-yellow-500 text-white py-2 rounded-lg shadow hover:bg-yellow-600">
                  Set Budget
                </button>
                <button className="bg-red-500 text-white py-2 rounded-lg shadow hover:bg-red-600">
                  View Alerts
                </button>
              </div>
            </div>

            {/* User Engagement */}
            <div className="bg-white p-5 shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold mb-3">User Engagement</h2>
              <CustomPieChart />
            </div>

            {/* User Details */}
            <div className="bg-white p-5 shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold mb-3">User Details</h2>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span>John Doe</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>johndoe@example.com</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Phone:</span>
                  <span>+123 456 7890</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Member Since:</span>
                  <span>Jan 1, 2020</span>
                </li>
              </ul>
              <button className="mt-5 bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600">
                View Full Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
