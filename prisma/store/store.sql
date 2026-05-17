-- Enable UUID generation support (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Products table
CREATE TABLE "Product" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clerkId" TEXT NOT NULL
);

-- 2. Favorites table
CREATE TABLE "Favorite" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "clerkId" TEXT NOT NULL,
    "productId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Favorite_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE
);

-- 3. Reviews table
CREATE TABLE "Review" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "clerkId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorImageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" UUID NOT NULL,
    CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE
);

-- 4. Carts table
CREATE TABLE "Cart" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "clerkId" TEXT NOT NULL,
    "numItemsInCart" INTEGER NOT NULL DEFAULT 0,
    "cartTotal" INTEGER NOT NULL DEFAULT 0,
    "shipping" INTEGER NOT NULL DEFAULT 5,
    "tax" INTEGER NOT NULL DEFAULT 0,
    "taxRate" DOUBLE PRECISION NOT NULL DEFAULT 0.1,
    "orderTotal" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- 5. CartItems table
CREATE TABLE "CartItem" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "productId" UUID NOT NULL,
    "cartId" UUID NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE,
    CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE
);

-- 6. Orders table
CREATE TABLE "Order" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "clerkId" TEXT NOT NULL,
    "products" INTEGER NOT NULL DEFAULT 0,
    "orderTotal" INTEGER NOT NULL DEFAULT 0,
    "tax" INTEGER NOT NULL DEFAULT 0,
    "shipping" INTEGER NOT NULL DEFAULT 0,
    "email" TEXT NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Recommended indexes for foreign keys and common queries
CREATE INDEX "Favorite_productId_idx" ON "Favorite"("productId");
CREATE INDEX "Review_productId_idx" ON "Review"("productId");
CREATE INDEX "CartItem_productId_idx" ON "CartItem"("productId");
CREATE INDEX "CartItem_cartId_idx" ON "CartItem"("cartId");
CREATE INDEX "Product_clerkId_idx" ON "Product"("clerkId");
CREATE INDEX "Favorite_clerkId_idx" ON "Favorite"("clerkId");
CREATE INDEX "Review_clerkId_idx" ON "Review"("clerkId");
CREATE INDEX "Cart_clerkId_idx" ON "Cart"("clerkId");
CREATE INDEX "Order_clerkId_idx" ON "Order"("clerkId");