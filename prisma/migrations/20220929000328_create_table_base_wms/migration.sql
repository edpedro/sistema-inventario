-- CreateTable
CREATE TABLE "baseWms" (
    "id" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "estoque" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "saldo" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "baseWms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "baseWms" ADD CONSTRAINT "baseWms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
