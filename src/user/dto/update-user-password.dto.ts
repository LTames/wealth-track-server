import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class updateUserPasswordDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
