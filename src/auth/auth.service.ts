import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { AuthDto } from "./dto/auth.dto";
import { verify } from "argon2";
import { Response } from "express";

@Injectable()
export class AuthService {
  public EXPIRE_DAY_REFRESH_TOKEN = 1;
  public REFRESH_TOKEN_NAME = "refreshToken";

  constructor(
    private jwt: JwtService,
    private _userService: UserService,
  ) {}

  async login(dto: AuthDto) {
    const { password, ...user } = await this.validateUser(dto);
    const tokens = await this.isssueTokens(user.id);

    return { user, ...tokens };
  }

  async register(dto: AuthDto) {
    const oldUser = await this._userService.getByEmail(dto.email);
    if (oldUser) throw new BadRequestException("User already exists");

    const { password, ...user } = await this._userService.create(dto);

    const tokens = await this.isssueTokens(user.id);

    return { user, ...tokens };
  }

  private isssueTokens(userId: string) {
    const data = { id: userId };
    const accessToken = this.jwt.sign(data, {
      expiresIn: "1h",
    });
    const refreshToken = this.jwt.sign(data, {
      expiresIn: "7d",
    });
    return { accessToken, refreshToken };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this._userService.getByEmail(dto.email);
    if (!user) throw new NotFoundException("user not found");

    const isValid = await verify(user.password, dto.password);
    if (!isValid) throw new NotFoundException("Invalid password");
    return user;
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);
    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      // коли буду деплоїти поміняти на деплой лінк
      domain: "https://planner-backend-4cgu.onrender.com",
      expires: expiresIn,
      secure: true,
      sameSite: "none",
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, "", {
      httpOnly: true,
      domain: "https://planner-backend-4cgu.onrender.com",
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    });
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException("Invalid refresh token");
    const { password, ...user } = await this._userService.getById(result.id);

    const tokens = this.isssueTokens(user.id);
    return {
      user,
      ...tokens,
    };
  }
}
