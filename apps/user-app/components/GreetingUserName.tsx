import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";


const GreetingUserName = async ()=>{
    let identifier:string;
    const session = await getServerSession(authOptions);
    if(session?.user?.id){
        identifier = session.user.id;
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