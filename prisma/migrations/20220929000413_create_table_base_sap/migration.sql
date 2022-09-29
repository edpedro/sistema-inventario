-- CreateTable
CREATE TABLE "baseSap" (
    "id" TEXT NOT NULL,
    "centro" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "deposito" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "saldo" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "baseSap_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "baseSap" ADD CONSTRAINT "baseSap_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
