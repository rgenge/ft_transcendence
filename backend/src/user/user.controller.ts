import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Req,
  Patch,
  HttpException,
} from '@nestjs/common';
import { UserService } from './service/user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth/jwt-auth.guard';
import { UserStatusEnum } from './domain/model/user.model';
import { UpdateNicknameDTO } from './dto/update-nickname.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUser: CreateUserDTO) {
    return await this.userService.insertUser(createUser);
  }


  @Get('list')
  async getUsers() {
    try {
      const users = await this.userService.getUserList();
      return users.map((user) => user.toJson());
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Get('me')
  async me(@Req() req: any): Promise<string> {
    try {
      const user = await this.userService.getUserById(req.user.id);
      return user.toJson();
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Patch("status")
  async updateStatus(@Req() req: any, @Body() body: { status: UserStatusEnum }) {
    return await this.userService.updateStatus(req.user.id, body.status);
  }

  @Patch("nickname")
  async updateNickname(@Req() req: any, @Body() body: UpdateNicknameDTO) {
    return await this.userService.updateNickname(req.user.id, body.nickname);
  }

  @Get(':nickname')
  async getUser(@Param('nickname') nickname: string) {
    try {
      return await this.userService.getUserByNickname(nickname);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
