import { PartialType } from '@nestjs/swagger';
import { CreateUserHttpDto } from './create-user-http.dto';

export class UpdateUserHttpDto extends PartialType(CreateUserHttpDto) {}
