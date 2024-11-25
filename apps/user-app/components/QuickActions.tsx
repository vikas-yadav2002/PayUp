"use client";
import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Loader from "./Loader";
import Modal from "./ServiceModal";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    previousAutoTable: { finalY: number };
  }
}

interface Balance {
  amount: number;
  locked: number;
}

interface DepositeTransaction {
  time: Date; amount: number; status: string; provider: string;
}

interface P2PTransaction {
  id: number; to: number; amount: number; timestamp: Date;
}

interface QuickActionProps {
  balance: Balance;
  DepositeTransaction: DepositeTransaction[];
  P2pTransaction: P2PTransaction[];
}

const QuickAction = ({
  balance,
  DepositeTransaction,
  P2pTransaction,
}: QuickActionProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleGenerateReport = async () => {
    setLoading(true);

    const doc = new jsPDF();

    // Balance Table
    doc.autoTable({
      head: [["Locked Amount", "Available Amount"]],
      body: [[balance.locked.toString(), (balance.amount/100).toString()]],
      startY: 10,
      theme: "grid",
      headStyles: { fillColor: [0, 0, 139], textColor: [255, 255, 255] }, // Dark blue background, white text
    });

    // P2P Transactions Table
    doc.autoTable({
      head: [["ID", "Receiver", "Amount", "Timestamp", ]],
      body: P2pTransaction.map((tx) => [
        tx.id,
    
        tx.id,
        tx.amount.toString(),
        tx.timestamp,
       
      ]),
      startY: doc.previousAutoTable.finalY + 10,
      theme: "grid",
      headStyles: { fillColor: [0, 0, 139], textColor: [255, 255, 255] },
    });

    // Deposit Transactions Table
    doc.autoTable({
      head: [["Time", "Amount", "Timestamp", "Method", "Status"]],
      body: DepositeTransaction.map((tx) => [
        tx.time,
        tx.amount.toString(),
        tx.time,
        tx.provider,
        tx.status,
      ]),
      startY: doc.previousAutoTable.finalY + 10,
      theme: "grid",
      headStyles: { fillColor: [0, 0, 139], textColor: [255, 255, 255] },
    });

    doc.save("QuickActionsReport.pdf");
    setLoading(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-white p-5 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600">
          Add Transaction
        </button>
        <button
          className="bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600"
          onClick={handleGenerateReport}
        >
          {loading ? <Loader /> : "Generate report"}
        </button>
        <button
          className="bg-yellow-500 text-white py-2 rounded-lg shadow hover:bg-yellow-600"
          onClick={openModal}
        >
          Set Budget
        </button>
        <button
          className="bg-red-500 text-white py-2 rounded-lg shadow hover:bg-red-600"
          onClick={openModal}
        >
          View Alerts
        </button>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default QuickAction;
