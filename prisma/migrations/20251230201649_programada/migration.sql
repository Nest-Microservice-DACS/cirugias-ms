-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cirugia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pacienteId" INTEGER NOT NULL,
    "quirofanoId" INTEGER NOT NULL,
    "servicioId" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "anestesia" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'programada',
    "prioridad" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Cirugia" ("anestesia", "createdAt", "estado", "fecha", "id", "pacienteId", "prioridad", "quirofanoId", "servicioId", "tipo", "updatedAt") SELECT "anestesia", "createdAt", "estado", "fecha", "id", "pacienteId", "prioridad", "quirofanoId", "servicioId", "tipo", "updatedAt" FROM "Cirugia";
DROP TABLE "Cirugia";
ALTER TABLE "new_Cirugia" RENAME TO "Cirugia";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
