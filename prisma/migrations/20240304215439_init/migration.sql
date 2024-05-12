-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(150) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `roleId` INTEGER NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompanyData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameCompany` VARCHAR(100) NOT NULL,
    `addressCompany` VARCHAR(191) NOT NULL,
    `rfc` VARCHAR(15) NOT NULL,
    `emailCompany` VARCHAR(191) NOT NULL,
    `phoneCompany` VARCHAR(20) NOT NULL,
    `typeIndustry` VARCHAR(60) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `CompanyData_emailCompany_key`(`emailCompany`),
    UNIQUE INDEX `CompanyData_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameUser` VARCHAR(191) NOT NULL,
    `emailUser` VARCHAR(191) NOT NULL,
    `phoneUser` VARCHAR(20) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `userId` INTEGER NOT NULL,
    `companyId` INTEGER NOT NULL,

    UNIQUE INDEX `UserData_emailUser_key`(`emailUser`),
    UNIQUE INDEX `UserData_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameRole` VARCHAR(50) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Role_nameRole_key`(`nameRole`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameAccount` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `companyId` INTEGER NOT NULL,

    UNIQUE INDEX `Account_nameAccount_key`(`nameAccount`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameClient` VARCHAR(191) NOT NULL,
    `addressClient` VARCHAR(191) NOT NULL,
    `phoneClient` VARCHAR(20) NOT NULL,
    `emailClient` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `companyId` INTEGER NOT NULL,
    `userId` INTEGER NULL,

    UNIQUE INDEX `Client_emailClient_key`(`emailClient`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `typeDocument` VARCHAR(50) NOT NULL,
    `dateInvoicing` DATE NOT NULL,
    `subtotalService` DECIMAL(65, 30) NOT NULL,
    `ivaService` DECIMAL(65, 30) NOT NULL,
    `totalService` DECIMAL(65, 30) NOT NULL,
    `description` MEDIUMTEXT NOT NULL,
    `typeService` VARCHAR(50) NOT NULL,
    `unitBusiness` VARCHAR(50) NOT NULL,
    `difference` DECIMAL(65, 30) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Sin pago',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `clientId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `registrationService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `datePayment` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `subtotalRegis` DECIMAL(65, 30) NOT NULL,
    `ivaRegis` DECIMAL(65, 30) NOT NULL,
    `totalRegis` DECIMAL(65, 30) NOT NULL,
    `payment` VARCHAR(50) NOT NULL,
    `typeIncome` VARCHAR(50) NOT NULL,
    `wallet` VARCHAR(191) NOT NULL,
    `comments` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `nameAccount` VARCHAR(191) NOT NULL,
    `serviceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompanyData` ADD CONSTRAINT `CompanyData_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserData` ADD CONSTRAINT `UserData_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserData` ADD CONSTRAINT `UserData_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `CompanyData`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `CompanyData`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `CompanyData`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserData`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `registrationService` ADD CONSTRAINT `registrationService_nameAccount_fkey` FOREIGN KEY (`nameAccount`) REFERENCES `Account`(`nameAccount`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `registrationService` ADD CONSTRAINT `registrationService_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
