import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateRatingDto } from './dto/create-rating.dto';
import { RatingsService } from './ratings.service';
@Controller('ratings')
export class RatingsController {
  constructor(private readonly service: RatingsService) {}
  @Post() create(@Body() dto: CreateRatingDto) {
    return this.service.create(dto);
  }
  @Get() @UseGuards(AuthGuard('jwt')) findAll() {
    return this.service.findAll();
  }
  @Get('stats') @UseGuards(AuthGuard('jwt')) stats() {
    return this.service.stats();
  }
}
