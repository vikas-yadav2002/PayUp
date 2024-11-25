// fetchTransactionsWithNames.ts
import prisma from "@repo/db/client";

// Interface for Transaction structure
interface Transaction {
  id: number;
  amount: number;
  timestamp: Date;
  to: number;
}

// Fetch recipient name based on ID
const getReciever = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { name: true }, // Fetch only the name
  });
  return user?.name || "Unknown"; // Default to "Unknown" if the name is not found
};

// Preprocess transactions to include recipient names
export const fetchTransactionsWithNames = async (transactions: Transaction[]) => {
  const transactionsWithNames = await Promise.all(
    transactions.map(async (transfer) => {
      const recipientName = await getReciever(transfer.to);
      return {
        ...transfer,
        recipientName, // Add recipient name to the transaction
      };
    })
  );
  return transactionsWithNames;
};
