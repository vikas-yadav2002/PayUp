import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";

const GreetingUserName = async () => {
  let identifier: string;
  const session = await getServerSession(authOptions);
  identifier = session?.user?.name ?? "Guest";

  return (
    <div className="p-4 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-800">
        Hello, <span className="capitalize text-purple-600">{identifier}</span>
      </h1>
      <p className="mt-2 text-sm text-gray-500">Welcome to your dashboard 🎉</p>
    </div>
  );
};

export default GreetingUserName;
