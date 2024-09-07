-- CreateTable
CREATE TABLE "p2ptransactions" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "Timestamp" TIMESTAMP(3) NOT NULL,
    "fromUserId" INTEGER NOT NULL,
    "toUserId" INTEGER NOT NULL,

    CONSTRAINT "p2ptransactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "p2ptransactions" ADD CONSTRAINT "p2ptransactions_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p2ptransactions" ADD CONSTRAINT "p2ptransactions_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
