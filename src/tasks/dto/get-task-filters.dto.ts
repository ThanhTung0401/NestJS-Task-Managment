import { TaskStatus } from '../task.model';
import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class GetTaskFiltersDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
