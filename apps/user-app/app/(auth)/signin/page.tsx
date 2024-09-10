import { getServerSession } from "next-auth";

import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";
import SignIn from "../../../components/SignIn";


  export default async function(){
    const session = await  getServerSession(authOptions);
    if(session?.user){
       redirect("/dashboard");
    }
    else{
        return <SignIn/>
    }



   
  }