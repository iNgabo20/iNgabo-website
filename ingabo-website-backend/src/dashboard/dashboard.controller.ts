import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../common/constants';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { DashboardService } from './dashboard.service';
@Controller('dashboard')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMINISTRATOR, Role.MAINTAINER)
export class DashboardController {
  constructor(private readonly service: DashboardService) {}
  @Get('stats') stats() {
    return this.service.stats();
  }
  @Get('activity') activity() {
    return this.service.activity();
  }
}
