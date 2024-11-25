import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
// import { fetchTransactionsWithNames } from "./fetchTransactionsWithNames"; // Import the function
import { P2PTransfer } from "../../../components/P2PTransaction";
import { fetchTransactionsWithNames } from "../../lib/actions/fetchTransactionsWithNames";

// Function to get P2P transactions for the logged-in user
const getP2PTransaction = async () => {
  const session = await getServerSession(authOptions); // Get the session data
  const userId = session?.user?.id; // Extract user ID from session

  if (!userId) {
    return []; // Return an empty array if user is not logged in
  }

  // Fetch transactions from the database for the logged-in user
  const transactions = await prisma.p2ptransactions.findMany({
    where: {
      fromUserId: Number(userId), // Filter transactions where the user is the sender
    },
    select: {
      id: true,
      toUserId: true, // Recipient user ID
      amount: true,
      Timestamp: true,
    },
  });

  // Fetch enriched transactions with recipient names
  const transactionsWithNames = await fetchTransactionsWithNames(transactions.map((t) => ({
    id: t.id,
    to: t.toUserId, // Recipient's user ID
    amount: t.amount / 100, // Convert amount to a readable format (assuming the stored value is in cents)
    timestamp: t.Timestamp, // Date of the transaction
  })));

  return transactionsWithNames;
};

// Page Component
export default async function TransactionsPage() {
  const transaction = await getP2PTransaction(); // Get the P2P transactions

  return (
    <div className="flex justify-center w-full">
      {/* Pass the enriched transactions with recipient names to the P2PTransfer component */}
      <P2PTransfer transaction={transaction} />
    </div>
  );
}
