import { Module } from "@nestjs/common";
import { TaskModule } from "./task/infrastructure";

@Module({
  imports: [TaskModule],
})
export class AppModule {}
