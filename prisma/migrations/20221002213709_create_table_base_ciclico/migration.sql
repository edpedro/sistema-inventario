-- CreateTable
CREATE TABLE "baseCiclico" (
    "id" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deposit" TEXT NOT NULL,
    "center" TEXT NOT NULL,
    "balanceSap" TEXT NOT NULL,
    "balanceWms" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "quantidadeContada" TEXT NOT NULL DEFAULT '',
    "justification" TEXT NOT NULL DEFAULT '',
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "baseCiclico_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "baseCiclico" ADD CONSTRAINT "baseCiclico_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
