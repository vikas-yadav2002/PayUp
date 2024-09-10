
import GreetingUserName from "../../../components/GreetingUserName";
import LineChart from "../../../components/LineChart";



export default async function() {
   
    return (
        <>
        <div className="flex flex-col">
        <div className="py-4">
            <GreetingUserName/>
        </div>
        <div className="w-96 h-1 bg-black ">

        </div>
        <div className="p-10">
          <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Other Dashboard Components */}
            <div className="bg-white p-5 shadow-lg rounded-lg w-[30rem]">
              <h2 className="text-xl font-semibold mb-3">Transaction Trends</h2>
              <LineChart />
            </div>
            <div className="bg-white p-5 shadow-lg rounded-lg w-[30rem]">
              <h2 className="text-xl font-semibold mb-3">Transaction History</h2>
              <LineChart />
            </div>
            {/* Add more sections, charts, cards, etc. as needed */}
          </div>
        </div>
        </div>
        </>
      );
    };
    