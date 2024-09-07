"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export const CreateOnRampTransaction = async (amount : number , Provider : string)=>{
   const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const token = Math.random().toString();

    if(!userId){
        console.log('invalid user id')
    }

    try{
      const update = await  prisma.onRampTransaction.create({
        data :{
            userId : Number(userId),
            provider : Provider,
            amount : amount,
            token : token ,
            startTime : new Date(),
            status : "Processing",

        }
      })

      console.log(update);
      console.log("completed")



    }catch(e){
        console.log(e)

    }






}