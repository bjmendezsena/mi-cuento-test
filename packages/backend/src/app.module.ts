import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envs } from "config";
import { SharedModule } from "@/shared/infrastructure";
import { TaskModule } from "./task/infrastructure";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => envs],
    }),
    TaskModule,
    SharedModule,
  ],
})
export class AppModule {}
