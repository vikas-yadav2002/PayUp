
import { BarChart, PieChart } from "recharts";
import GreetingUserName from "../../../components/GreetingUserName";
import LineChart from "../../../components/LineChart";
import CustomBarChart from "../../../components/barChart";
import CustomPieChart from "../../../components/pieChart";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import Notifications from "../../../components/Notifications";
import QuickAction from "../../../components/QuickActions";
import UserEngagement from "../../../components/UserEngagement";
import UserDetails from "../../../components/UserDetails";
import { Session } from "inspector";




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
            <Notifications/>

            {/* Quick Actions */}
            <QuickAction/>

            {/* User Engagement */}
            <UserEngagement/>

            {/* User Details */}
            <UserDetails/>
          </div>
        </div>
      </div>
    </>
  );
}
