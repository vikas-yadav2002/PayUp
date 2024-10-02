"use client"
import { Card } from "@repo/ui/card";
import CountUp from "react-countup";

export const BalanceCard = ({amount, locked}: {
    amount: number;
    locked: number;
}) => {
    return <Card title={"Balance"}>
        <div className="flex justify-between border-b border-slate-300 pb-2">
            <div>
                Unlocked balance
            </div>
            <div>
                {<CountUp end={amount / 100}  decimals={2}/>}
                INR
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2">
            <div>
                Total Locked Balance
            </div>
            <div>
            {<CountUp end={locked / 100}  decimals={2}/>}
                 INR
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2">
            <div>
                Total Balance
            </div>
            <div>
            {<CountUp end={(locked + amount) / 100}  decimals={2}/>}
                INR
            </div>
        </div>
    </Card>
}