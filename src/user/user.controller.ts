import {
  Body,
  Controller,
  Get,
  HttpCode,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthDecorator } from "../auth/decorators/auth.decorator";
import { CurrentUser } from "../auth/decorators/user.decorator";
import { UserDto } from "./dto/user.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("User/Profile")
@Controller("user/profile")
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  @AuthDecorator()
  async profile(@CurrentUser("id") id: string) {
    return this._userService.getProfile(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @AuthDecorator()
  async updateProfile(@CurrentUser("id") id: string, @Body() dto: UserDto) {
    return this._userService.update(id, dto);
  }
}
