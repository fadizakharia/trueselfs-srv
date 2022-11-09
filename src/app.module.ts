import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      host: process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
      port: +process.env.DB_PORT ? +process.env.DB_PORT : 5432,
      username: process.env.DB_USERNAME
        ? process.env.DB_USERNAME
        : 'fadizakharia',
      entities: ['src/entities'],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
