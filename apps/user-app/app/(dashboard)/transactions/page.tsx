import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { P2PTransfer } from "../../../components/P2PTransaction";

const getP2PTransaction = async () => {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return []; // Return empty array if user is not logged in
    }

    const transactions = await prisma.p2ptransactions.findMany({
        where: {
            fromUserId: Number(userId),
        },
    });

    return transactions.map((t) => ({
        id: t.id,
        to: t.toUserId,
        amount: (t.amount/100),
        timestamp: t.Timestamp,
    })); // need to learn the difference betweeen array.map((item)=>{ }) and array.map(item=>({}))
};

export default async function TransactionsPage() {
    const transaction = await getP2PTransaction();

    return (
        <div>
            <P2PTransfer transaction={transaction} />
        </div>
    );
}
