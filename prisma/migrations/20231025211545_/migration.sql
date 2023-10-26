/*
  Warnings:

  - You are about to drop the `payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_categoryId_fkey";

-- DropTable
DROP TABLE "payment";

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "type" "PaymentType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payments_id_key" ON "payments"("id");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
