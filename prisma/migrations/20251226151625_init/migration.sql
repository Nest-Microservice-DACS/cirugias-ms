-- CreateTable
CREATE TABLE "Cirugia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pacienteId" INTEGER NOT NULL,
    "quirofanoId" INTEGER NOT NULL,
    "fecha" DATETIME NOT NULL,
    "estado" TEXT NOT NULL,
    "prioridad" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
