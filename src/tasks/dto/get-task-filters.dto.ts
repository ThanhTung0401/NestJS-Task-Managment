import { TaskStatus } from '../task.model';

export class GetTaskFiltersDto {
  status?: TaskStatus;
  search?: string;
}
