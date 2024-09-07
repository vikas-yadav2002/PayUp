import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return (
        <Card title="Recent Transactions">
            <div className="pt-2 space-y-4">
                {transactions.map((t, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
                    >
                        <div>
                            <div className="text-sm font-semibold text-gray-700">
                                Received INR
                            </div>
                            <div className="text-slate-600 text-xs">
                                {t.time.toDateString()}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center text-right">
                            <span className="text-lg font-bold text-green-600">
                                + Rs {t.amount / 100}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
    
}