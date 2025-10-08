import {EntityRepository, Repository} from "typeorm";
import {Task} from "./task.entity";
import {CreateTaskDto} from "./dto/create-task.dto";
import {TaskStatus} from "./task-status.enum";
import {NotFoundException} from "@nestjs/common";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });
        await this.save(task);
        return task;

    }

    async deleteTask(taskId: string): Promise<void> {
        const result = await this.delete(taskId);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${taskId}" not found`);
        }
    }

}