import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { ValidatePipe } from '../../shared/pipes/validate.pipe';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
@UsePipes(ValidatePipe)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() newUser: RegisterDto) {
    return this.authService.register(newUser);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  getMe(@Request() req: { user: { id: number } }) {
    return this.authService.getMe(req.user.id);
  }
}
