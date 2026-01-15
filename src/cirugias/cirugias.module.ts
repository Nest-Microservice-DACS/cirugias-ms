import { Module } from '@nestjs/common';
import { CirugiasController } from './cirugias.controller';
import { SurgeriesService } from './surgery.service';

@Module({
  controllers: [CirugiasController],
  providers: [SurgeriesService],
})
export class CirugiasModule {}
