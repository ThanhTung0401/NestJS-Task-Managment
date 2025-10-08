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
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFiltersDto } from './dto/get-task-filters.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import {Task} from "./task.entity";
import {DeleteResult} from "typeorm";

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTasksById(id);
  }

  @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
    deleteTask(@Param('id') id: string): Promise<DeleteResult> {
      return this.tasksService.deleteTask(id);
  }
}

