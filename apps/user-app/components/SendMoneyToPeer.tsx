"use client";
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import SendMoney from "../app/lib/actions/SendMoney";
import Loader from "./Loader";

const SendMoneyToPeers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>(""); // Ensure it's a string
  const [peerAddress, setPeerAddress] = useState<string>(""); // Ensure it's a string

  const handleSendMoney = async () => {
    setLoading(true);

    console.log("Sending money...");

    // Call the SendMoney function
    const res = await SendMoney(peerAddress, Number(amount) * 100);

    if (res?.error) {
      console.error(res.error);
      alert(`Transfer failed: ${res.error || "An error occurred"}`);
    } else {
      console.log(res);
      alert(`Transfer successful!`);
    }

    // Reset form state
    setPeerAddress("");
    setAmount("");
    setLoading(false);
  };

  return (
    <div className="w-full mx-auto p-6 bg-gradient-to-br from-blue-100 via-slate-100 to-blue-50 text-slate-950 rounded-xl shadow-2xl">
      <h2 className="text-center text-2xl font-bold mb-6 text-blue-800">
        Send Money
      </h2>
      <div className="mb-4">
        <TextInput
          label="Phone Number"
          placeholder="Phone Number Here"
          onChange={(value) => setPeerAddress(value)}
          value={peerAddress} // Bind value to state
          className="shadow-lg focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-6">
        <TextInput
          label="Amount"
          placeholder="Enter Amount Here"
          onChange={(value) => setAmount(value)}
          value={amount} // Bind value to state
          className="shadow-lg focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="w-full flex justify-center items-center">
        <Button
          onClick={handleSendMoney}
          disabled={loading} // Disable the button when loading
          className={`w-full py-2 rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? <Loader /> : "Send Money"}
        </Button>
      </div>
    </div>
  );
};

export default SendMoneyToPeers;
