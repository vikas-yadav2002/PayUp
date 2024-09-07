"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

const SendMoney = async (To : string , amount : number)=>{
    console.log(amount)
const session = await getServerSession(authOptions);
const from = session?.user?.id;
if(!from){
    return {error : "You must be logged in to send money"};
}

const reciver = await prisma.user.findFirst({
    where :{
        number : To
    }
})

if(!reciver){
    console.log('not found')
    return {error : "User not found"};
}
await prisma.$transaction(async (tx)=>{
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE` 
    //locking
    const senderBal = await tx.balance.findFirst({
        where :{
        userId : Number(from)
        }
    })

    if(!senderBal || senderBal?.amount < amount ){
      
        throw new Error('insufficient funds');
    }
    
    await tx.balance.update({
        where:{
            userId : Number(from)
        } , data:{
            amount :{
                decrement : amount
            }
        }
    })

    await tx.balance.update({
        where:{
            userId : reciver.id
        } , data: {
            amount : {
                increment : amount
            }
        }
    })
  await tx.p2ptransactions.create({
    data : {
        fromUserId : Number(from),
        toUserId : reciver.id ,
        amount : amount ,
        //status to be added if sucess or failed here
        Timestamp : new Date(),
        
    }
  })
    return({
        message : "Money sent successfully"
    })



   
})





}

export default SendMoney;