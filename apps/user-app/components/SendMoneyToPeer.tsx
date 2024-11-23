"use client";
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import SendMoney from "../app/lib/actions/SendMoney";

const SendMoneyToPeers = () => {
  const [amount , setAmount] = useState("");
  const [peerAddress, setPeerAddress] = useState("");
  return (
    <div className="w-full mx-auto p-6 bg-gradient-to-br from-blue-100 via-slate-100 to-blue-50 text-slate-950 rounded-xl shadow-2xl">
      <h2 className="text-center text-2xl font-bold mb-6 text-blue-800">Send Money</h2>
      <div className="mb-4">
        <TextInput
          label={"Phone Number"}
          placeholder="Phone Number Here"
          onChange={(value) => {
            setPeerAddress(value);
            console.log("Phone Number Changed");
          }}
          className="shadow-lg focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-6">
        <TextInput
          label={"Amount"}
          placeholder="Enter Amount Here"
          onChange={(value) => {
            setAmount(value);
            console.log("Amount entered");
          }}
          className="shadow-lg focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="w-full flex justify-center items-center">
        <Button
          onClick={async ()=>{
            console.log("hello from above")
          const res =  await SendMoney(peerAddress , Number(amount)*100);
          if(res?.error){
            console.log(res.error)
          }
         
          
          }}

          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-lg transition-all duration-300 ease-in-out"
        >
          Send Money
        </Button>
      </div>
    </div>
  );
};

export default SendMoneyToPeers;
