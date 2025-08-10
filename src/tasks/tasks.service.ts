import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFiltersDto } from './dto/get-task-filters.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  GetAllTasks(): Task[] {
    return this.tasks;
  }

  CreateTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  GetTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new Error(`Task with ID "${id}" not found`);
    }
    return found;
  }

  DeleteTask(id: string): void {
    const found = this.GetTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }

  UpdateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.GetTaskById(id);
    task.status = status;
    return task;
  }

  getTasksWithFilters(filterDto: GetTaskFiltersDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.GetAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }
}
