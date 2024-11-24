import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";


const GreetingUserName = async ()=>{
    let identifier:string;
    const session = await getServerSession(authOptions);
    if(session?.user?.name){
        identifier = session.user.name;
    }
    else{
        
        identifier = "guest";
    }

    return (
        <div>
            <h1>Hello, {identifier}!</h1>
        </div>
    )

    
    
    
}

export default GreetingUserName;