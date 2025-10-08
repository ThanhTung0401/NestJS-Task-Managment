import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';
import { GetTaskFiltersDto } from './dto/get-task-filters.dto';

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

  async getAllTasks(): Promise<Task[]> {
    return this.find();
  }

  async getTaskFilter(filterDto: GetTaskFiltersDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere('(LOWER(task.title) LIKE LOWER(:search) OR LOWER)');
      query.andWhere('LOWER(task.description) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }
    const tasks = await query.getMany();
    return tasks;
  }

  async deleteTask(taskId: string): Promise<void> {
    const result = await this.delete(taskId);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${taskId}" not found`);
    }
  }

  async updateTaskStatus(
    id: string,
    status: { status: TaskStatus },
  ): Promise<Task> {
    const task = await this.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    task.status = status.status;
    await this.save(task);
    return task;
  }
}
