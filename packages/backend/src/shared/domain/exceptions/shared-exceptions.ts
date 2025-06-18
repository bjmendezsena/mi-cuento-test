import { BadRequestException } from "@nestjs/common";

export class InvalidValueObjectException extends BadRequestException {
  constructor(value: string) {
    super(`The value ${value} is not a valid value object`);
  }
}
