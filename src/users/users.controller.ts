import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { Point } from 'geojson';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findNearby(
    @Query('page', ParseIntPipe) page: number,
    @Query('skip', ParseIntPipe) skip = 10,
    @Query('longitude', ParseIntPipe) longitude: number,
    @Query('latitude', ParseIntPipe) latitude: number,
    @Query('range', ParseIntPipe) range: number,
  ) {
    const originGeoJson = {
      type: 'Point',
      coordinates: [longitude, latitude],
    } as Point;
    const foundUsers = await this.usersService.findNearbyUsers(
      page,
      skip,
      originGeoJson,
      range,
    );
    return {
      users: foundUsers,
      meta: {
        pagination: {
          skip,
          page,
        },
      },
    };
  }
}
