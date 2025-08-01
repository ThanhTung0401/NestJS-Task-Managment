import { Body, Controller, Get, Post, Delete, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.GetAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    if (!createTaskDto.title || !createTaskDto.description) {
      throw new Error('Title and description are required');
    }
    return this.tasksService.CreateTask(createTaskDto);
  }

  @Get(':id')
  getTaskById(@Body('id') id: string): Task {
    if (!id) {
      throw new Error('ID is required');
    }
    return this.tasksService.GetTaskById(id);
  }

  @Delete(':id')
  deleteTask(@Body('id') id: string): void {
    if (!id) {
      throw new Error('ID is required');
    }
    this.tasksService.DeleteTask(id);
  }

  @Put(':id/status')
  updateTaskStatus(
    @Body('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    if (!id || !status) {
      throw new Error('ID and status are required');
    }
    return this.tasksService.UpdateTaskStatus(id, status);
  }
}
