const QuickAction = () =>{
   return(
    <div className="bg-white p-5 shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600">
                  Add Transaction
                </button>
                <button className="bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600">
                  Generate Report
                </button>
                <button className="bg-yellow-500 text-white py-2 rounded-lg shadow hover:bg-yellow-600">
                  Set Budget
                </button>
                <button className="bg-red-500 text-white py-2 rounded-lg shadow hover:bg-red-600">
                  View Alerts
                </button>
              </div>
    </div>
   )
}


export default QuickAction;