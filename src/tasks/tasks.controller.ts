import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFiltersDto } from './dto/get-task-filters.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFiltersDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    }
    return this.tasksService.GetAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    if (!createTaskDto.title || !createTaskDto.description) {
      throw new Error('Title and description are required');
    }
    return this.tasksService.CreateTask(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    if (!id) {
      throw new Error('ID is required');
    }
    return this.tasksService.GetTaskById(id);
  }

  @Delete('/:id')
  deleteTask(@Body('id') id: string): void {
    if (!id) {
      throw new Error('ID is required');
    }
    this.tasksService.DeleteTask(id);
  }

  @Put(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;
    if (!id || !status) {
      throw new Error('ID and status are required');
    }
    if (!Object.values(TaskStatus).includes(status)) {
      throw new Error(`Invalid status: ${status}`);
    }
    return this.tasksService.UpdateTaskStatus(id, status);
  }
}
