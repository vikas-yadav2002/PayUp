-- CreateTable
CREATE TABLE "MerchantTransactions" (
    "id" SERIAL NOT NULL,
    "merchantId" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MerchantTransactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MerchantTransactions" ADD CONSTRAINT "MerchantTransactions_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
