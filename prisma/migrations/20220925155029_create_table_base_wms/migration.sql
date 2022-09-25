-- CreateTable
CREATE TABLE "base-wms" (
    "id" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "estoque" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "saldo" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "base-wms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "base-wms" ADD CONSTRAINT "base-wms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
