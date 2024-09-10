import { getServerSession } from "next-auth";
import SignUp from "../../../components/SignUp";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";

  export default async function(){
    const session = await  getServerSession(authOptions);
    if(session?.user){
       redirect("/dashboard");
    }
    else{
        return <SignUp/>
    }



   
  }