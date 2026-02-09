import { PartialType } from '@nestjs/swagger';
import { CreateAuthHttpDto } from './create-auth-http.dto';

export class UpdateAuthHttpDto extends PartialType(CreateAuthHttpDto) {}
