import { BadRequestException } from '@nestjs/common';

export class UserAlreadyExistsException extends BadRequestException {
  constructor(field: string) {
    super(`User already exists with ${field}`);
  }
}
