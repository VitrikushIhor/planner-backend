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
import { TimeBlockService } from "./time-block.service";
import { AuthDecorator } from "../auth/decorators/auth.decorator";
import { CurrentUser } from "../auth/decorators/user.decorator";
import { TimeBlockDto } from "./dto/time-block.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("User/Time-Block")
@Controller("user/time-block")
export class TimeBlockController {
  constructor(private readonly _timeBlockService: TimeBlockService) {}

  @Get()
  @AuthDecorator()
  async getAll(@CurrentUser("id") userId: string) {
    return this._timeBlockService.getAll(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @AuthDecorator()
  async create(@Body() dto: TimeBlockDto, @CurrentUser("id") userId: string) {
    return this._timeBlockService.create(dto, userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put("update-order")
  @AuthDecorator()
  updateOrder(@Body() updateOrderDto: UpdateOrderDto) {
    return this._timeBlockService.updateOrder(updateOrderDto.ids);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(":id")
  @AuthDecorator()
  async update(
    @Body() dto: TimeBlockDto,
    @CurrentUser("id") userId: string,
    @Param("id") id: string,
  ) {
    return this._timeBlockService.update(dto, id, userId);
  }

  @HttpCode(200)
  @Delete(":id")
  @AuthDecorator()
  async delete(@CurrentUser("id") userId: string, @Param("id") id: string) {
    return this._timeBlockService.delete(id, userId);
  }
}
