import { Body, Controller, Get, Post, Delete, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.GetAllTasks();
  }

  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    if (!title || !description) {
      throw new Error('Title and description are required');
    }
    return this.tasksService.CreateTask(title, description);
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
