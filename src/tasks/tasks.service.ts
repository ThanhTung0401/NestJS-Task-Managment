import {Injectable, NotFoundException} from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFiltersDto } from './dto/get-task-filters.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "./task.entity";
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>) {
    }

    async getTasksById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOne({where: {id}});
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = this.tasksRepository.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });
        await this.tasksRepository.save(task);
        return task;

    }

}
