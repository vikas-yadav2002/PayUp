import CustomPieChart from "./pieChart";
interface pieChartProps{
  balance : number ,
  depositSum  : number ,
   p2pSum : number
}

const UserEngagement = ({balance , depositSum , p2pSum}:pieChartProps)=>{
    return (

    
<div className="bg-white p-5 shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold mb-3">User Engagement</h2>
              <CustomPieChart balance={balance} depositSum={depositSum/100} p2pSum={p2pSum} />
            </div>)
}


export default UserEngagement;