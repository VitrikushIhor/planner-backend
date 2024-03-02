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
import { TimerService } from "./timer.service";
import { CurrentUser } from "../auth/decorators/user.decorator";
import { AuthDecorator } from "../auth/decorators/auth.decorator";
import { PomodoroRoundDto, PomodoroSessionDto } from "./dto/timer.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("User/Timer")
@Controller("user/timer")
export class TimerController {
  constructor(private readonly _timerService: TimerService) {}

  @Get("today")
  @AuthDecorator()
  async getTodaySession(@CurrentUser("id") userId: string) {
    return this._timerService.getTodaySession(userId);
  }

  @HttpCode(200)
  @Post()
  @AuthDecorator()
  async create(@CurrentUser("id") userId: string) {
    return this._timerService.create(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put("/round/:id")
  @AuthDecorator()
  async updateRound(@Param("id") id: string, @Body() dto: PomodoroRoundDto) {
    return this._timerService.updateRound(dto, id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(":id")
  @AuthDecorator()
  async update(
    @Body() dto: PomodoroSessionDto,
    @CurrentUser("id") userId: string,
    @Param("id") id: string,
  ) {
    return this._timerService.update(dto, id, userId);
  }

  @HttpCode(200)
  @Delete(":id")
  @AuthDecorator()
  async deleteSession(
    @Param("id") id: string,
    @CurrentUser("id") userId: string,
  ) {
    return this._timerService.deleteSession(id, userId);
  }
}
