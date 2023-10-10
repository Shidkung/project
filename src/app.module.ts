import { Module,NestModule, MiddlewareConsumer} from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import entities from '../typeors';
import { TicketpayModule } from './Ticketpay/Ticketpay.module';
import { AuthModule } from './auth/auth.module';
import { ConcertModule } from './concert/concert.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: + configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: entities,
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,  // Set to true if your PostgreSQL server has a valid SSL certificate
        },
        extra: {
          sslmode: 'require',
        }
      }),
      inject: [ConfigService],
    }),
    UsersModule,TicketpayModule,AuthModule,ConcertModule],

  controllers: [AppController],
  
  providers: [AppService],
})
export class AppModule {}




