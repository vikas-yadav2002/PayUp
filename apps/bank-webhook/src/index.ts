import express, { json } from "express";
import db from "@repo/db/client";
import {z} from "zod";
const app = express();
const paymentSchema = z.object({
    token : z.string(),
    userId : z.string(),
    amount : z.number()
})

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
    // TODO: Add zod validation here?

    // TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    
    console.log(paymentInformation);

    try {
        const parsedData = paymentSchema.safeParse(paymentInformation);
        if (!parsedData.success) {
            return res.json({
                success: false,
                errors: parsedData.error.errors, // Include validation errors
            });
        }
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId) // Ensure userId is a number
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount) // Ensure amount is a number
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success"
                }
            })
        ]);

        res.json({
            message: "Captured"
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Error while processing webhook"
        });
    }
});

app.listen(3003, () => {
    console.log("Server is running on port 3003");
});
