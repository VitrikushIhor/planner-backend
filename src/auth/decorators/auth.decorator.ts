import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../guard/jwt.guard";

export const AuthDecorator = () => UseGuards(JwtAuthGuard);
