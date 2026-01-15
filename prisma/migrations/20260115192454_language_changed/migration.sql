/*
  Warnings:

  - You are about to drop the `Cirugia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CirugiaMedico` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CirugiaMedico" DROP CONSTRAINT "CirugiaMedico_cirugiaId_fkey";

-- DropTable
DROP TABLE "Cirugia";

-- DropTable
DROP TABLE "CirugiaMedico";

-- CreateTable
CREATE TABLE "Surgery" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "operatingRoomId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "anesthesia" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "priority" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Surgery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurgeryDoctor" (
    "id" SERIAL NOT NULL,
    "surgeryId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "SurgeryDoctor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Surgery_status_idx" ON "Surgery"("status");

-- CreateIndex
CREATE UNIQUE INDEX "SurgeryDoctor_surgeryId_doctorId_role_key" ON "SurgeryDoctor"("surgeryId", "doctorId", "role");

-- AddForeignKey
ALTER TABLE "SurgeryDoctor" ADD CONSTRAINT "SurgeryDoctor_surgeryId_fkey" FOREIGN KEY ("surgeryId") REFERENCES "Surgery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
