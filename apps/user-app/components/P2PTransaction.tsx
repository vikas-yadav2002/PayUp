"use client";
import { format } from "date-fns";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import prisma from "@repo/db/client";

const getReciever = async (id: number) => {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true, // Only fetch the name field
      },
    });
    return user?.name || "Unknown";
  };

interface Transaction {
    id: number;
    amount: number;
    timestamp: Date;
    to : number
    recipientName : string

}

// Destructure the `transaction` array from the props
export const P2PTransfer = ({
    transaction, // expecting an array of transactions
} :{
    transaction: Transaction[]
}) => {
    if (transaction.length === 0) {
        return (
            <Card title="Recent Transactions">
                <div className="text-center pb-8 pt-8">No Recent transactions</div>
            </Card>
        );
    }

    return (
        <div className="m-4">

       
        <Card title="Recent Transactions">
    <div className="p-2 m-1 space-y-4 w-full ">
        {transaction.map((transfer) => (
            
            <div
                key={transfer.id}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex gap-32 items-center"
            >
                <div className="text-lg font-semibold text-gray-700">
                    To: <span className="text-gray-900">{transfer.recipientName}</span>
                </div>
                <div className="text-md text-gray-600">
                    Amount: <span className="text-green-600 font-bold">${transfer.amount}</span>
                </div>
                <div className="text-sm text-gray-500">
                Date: {format(new Date(transfer.timestamp), "MM/dd/yyyy, hh:mm:ss a")}
                </div>
                <Button onClick={()=>{
                 console.log("clicked")
                }}>View Details</Button>
            </div>
        ))}
    </div>
</Card>
</div>

    );
};
