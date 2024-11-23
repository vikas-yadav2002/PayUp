import { getServerSession } from "next-auth";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import SendMoneyToPeers from "../../../components/SendMoneyToPeer";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";


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


export default async function P2P() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return (
        <div className="w-screen p-6">
            {/* Page Title */}
            <div className="text-4xl text-[#6a51a6] font-bold pt-8 mb-8">
                Transfer
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
               
                <div>
                <SendMoneyToPeers />
                </div>

                {/* Right Column: Balance and Transactions */}
                <div className="flex flex-col gap-6">
                    {/* Balance Card */}
                    <div className="p-4 bg-white shadow-md rounded-lg">
                        <BalanceCard amount={balance.amount} locked={balance.locked} />
                    </div>

                    {/* Transactions */}
                    <div className="p-4 bg-white shadow-md rounded-lg">
                        <OnRampTransactions transactions={transactions} />
                    </div>
                </div>
            </div>
        </div>
    );
}
