import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParticipationModule } from './participation/participation.module';

@Module({
  imports: [ParticipationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
