const UserDetails = ()=>{
    return(
    <div className="bg-white p-5 shadow-lg rounded-lg">
    <h2 className="text-xl font-semibold mb-3">User Details</h2>
    <ul className="space-y-3">
      <li className="flex justify-between">
        <span className="font-medium">Name:</span>
        <span>John Doe</span>
      </li>
      <li className="flex justify-between">
        <span className="font-medium">Email:</span>
        <span>johndoe@example.com</span>
      </li>
      <li className="flex justify-between">
        <span className="font-medium">Phone:</span>
        <span>+123 456 7890</span>
      </li>
      <li className="flex justify-between">
        <span className="font-medium">Member Since:</span>
        <span>Jan 1, 2020</span>
      </li>
    </ul>
    <button className="mt-5 bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600">
      View Full Profile
    </button>
  </div>)
}

export default UserDetails;