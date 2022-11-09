import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from 'geojson';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async findNearbyUsers(
    page: number,
    skip: number,
    origin: Point,
    range: number,
  ) {
    const foundNearbyUsers = await this.userRepository
      .createQueryBuilder('target_user')
      .select([
        '*',
        'ST_Distance(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin),ST_SRID(location))/1000 AS distance',
      ])
      .where(
        'ST_DWithin(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)) ,:range)',
      )
      .orderBy('distance', 'ASC')
      .setParameters({
        origin,
        page,
        skip,
        range,
      })
      .getRawMany();
    return foundNearbyUsers;
  }
}
