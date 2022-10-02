-- CreateTable
CREATE TABLE "baseSap" (
    "id" TEXT NOT NULL,
    "center" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deposit" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "balance" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "baseSap_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "baseSap" ADD CONSTRAINT "baseSap_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
