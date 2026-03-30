-- CreateTable
CREATE TABLE "CarouselSlide" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imageUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "link" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Country" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "flagUrl" TEXT,
    "continent" TEXT,
    "showOnHome" BOOLEAN NOT NULL DEFAULT false,
    "homeOrder" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "VisaInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "countryId" INTEGER NOT NULL,
    "purpose" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "documentList" TEXT NOT NULL,
    "applicationZones" TEXT NOT NULL DEFAULT '[]',
    "processingTime" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "embassyName" TEXT,
    "embassyAddress" TEXT,
    "embassyPhone" TEXT,
    "embassyWeb" TEXT,
    "consulateName" TEXT,
    "consulateAddress" TEXT,
    "consulatePhone" TEXT,
    "consulateWeb" TEXT,
    "pdf1Url" TEXT,
    "pdf1Label" TEXT,
    "pdf2Url" TEXT,
    "pdf2Label" TEXT,
    "pdf3Url" TEXT,
    "pdf3Label" TEXT,
    "pdf4Url" TEXT,
    "pdf4Label" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "VisaInfo_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_slug_key" ON "Country"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");
