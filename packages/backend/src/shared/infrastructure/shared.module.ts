import { Global, Module } from "@nestjs/common";
import { PrismaService } from "@/shared/infrastructure/db/prisma";

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class SharedModule {}
