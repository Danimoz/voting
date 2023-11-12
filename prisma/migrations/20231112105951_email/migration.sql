-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_userId_fkey";

-- AlterTable
ALTER TABLE "Vote" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
