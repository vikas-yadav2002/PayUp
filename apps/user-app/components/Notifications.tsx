const Notifications = ()=>{
    return(
        <div className="bg-white p-5 shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold mb-3">Notifications</h2>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="bg-blue-500 h-2 w-2 rounded-full"></span>
                  <span>Image selection remaining!!!</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-yellow-500 h-2 w-2 rounded-full"></span>
                  <span>Pending approval from bank refund</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-green-500 h-2 w-2 rounded-full"></span>
                  <span>Payment successful for invoice #123</span>
                </li>
              </ul>
            </div>
    )
}

export default Notifications