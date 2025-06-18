import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Put,
  Param,
  Delete,
} from "@nestjs/common";

@Controller("tasks")
export class TaskController {
  constructor() {}

  @Get()
  create() {
    return "Hello world";
  }
}
