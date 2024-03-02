import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { CurrentUser } from "../auth/decorators/user.decorator";
import { AuthDecorator } from "../auth/decorators/auth.decorator";
import { TaskDto } from "./dto/tasl.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("User/Tasks")
@Controller("user/tasks")
export class TaskController {
  constructor(private readonly _taskService: TaskService) {}

  @Get()
  @AuthDecorator()
  async getAll(@CurrentUser("id") userId: string) {
    return this._taskService.getAll(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @AuthDecorator()
  async create(@Body() dto: TaskDto, @CurrentUser("id") userId: string) {
    return this._taskService.create(dto, userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(":id")
  @AuthDecorator()
  async update(
    @Body() dto: TaskDto,
    @CurrentUser("id") userId: string,
    @Param("id") id: string,
  ) {
    return this._taskService.update(dto, id, userId);
  }

  @HttpCode(200)
  @Delete(":id")
  @AuthDecorator()
  async delete(@Param("id") id: string) {
    return this._taskService.delete(id);
  }
}
