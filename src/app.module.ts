import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    PlayersModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
