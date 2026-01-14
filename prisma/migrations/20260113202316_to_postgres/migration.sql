-- CreateTable
CREATE TABLE "Cirugia" (
    "id" SERIAL NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "quirofanoId" INTEGER NOT NULL,
    "servicioId" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "anestesia" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'programada',
    "prioridad" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cirugia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CirugiaMedico" (
    "id" SERIAL NOT NULL,
    "cirugiaId" INTEGER NOT NULL,
    "medicoId" INTEGER NOT NULL,
    "rol" TEXT NOT NULL,

    CONSTRAINT "CirugiaMedico_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Cirugia_estado_idx" ON "Cirugia"("estado");

-- CreateIndex
CREATE UNIQUE INDEX "CirugiaMedico_cirugiaId_medicoId_rol_key" ON "CirugiaMedico"("cirugiaId", "medicoId", "rol");

-- AddForeignKey
ALTER TABLE "CirugiaMedico" ADD CONSTRAINT "CirugiaMedico_cirugiaId_fkey" FOREIGN KEY ("cirugiaId") REFERENCES "Cirugia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
