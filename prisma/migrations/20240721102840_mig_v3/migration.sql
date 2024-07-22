-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "WorkoutResults" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "time_start" TEXT NOT NULL,
    "time_end" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserToWorkoutResults" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_UserToWorkoutResults_A_fkey" FOREIGN KEY ("A") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserToWorkoutResults_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkoutResults" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_UserToWorkoutResults_AB_unique" ON "_UserToWorkoutResults"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToWorkoutResults_B_index" ON "_UserToWorkoutResults"("B");
