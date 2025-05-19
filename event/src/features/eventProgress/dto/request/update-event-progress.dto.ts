import { PartialType } from '@nestjs/mapped-types';
import { CreateEventProgressDto } from './create-event-progress.dto';

export class UpdateEventProgressDto extends PartialType(
  CreateEventProgressDto,
) {}
