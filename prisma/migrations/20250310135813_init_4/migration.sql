-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentIntentId" TEXT,
ADD COLUMN     "paymentStatus" TEXT DEFAULT 'pending',
ADD COLUMN     "shippingAddress" TEXT;
