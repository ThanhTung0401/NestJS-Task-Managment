import {Injectable, NotFoundException} from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFiltersDto } from './dto/get-task-filters.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "./task.entity";
import {DeleteResult, Repository} from 'typeorm';
import {TaskRepository} from "./task.repository";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: TaskRepository) {
    }

    async getTasksById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOne({where: {id}});
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto);
    }

    async deleteTask(id: string): Promise<DeleteResult> {
       return this.tasksRepository.delete(id);

    }

}
