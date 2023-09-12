import { Module } from '@nestjs/common';
import { ParticipationModule } from './participation/participation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mongodb',
    url: 'mongodb://1.0.0.3/participation',
    entities: [],
    synchronize: true,
    autoLoadEntities: true,
    useUnifiedTopology: true,
  }), ParticipationModule,
  GraphQLModule.forRoot({
    autoSchemaFile: true
  })],

})
export class AppModule { }
