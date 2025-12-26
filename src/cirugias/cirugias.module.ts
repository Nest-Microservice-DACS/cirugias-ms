import { Module } from '@nestjs/common';
import { CirugiasService } from './cirugias.service';
import { CirugiasController } from './cirugias.controller';

@Module({
  controllers: [CirugiasController],
  providers: [CirugiasService],
})
export class CirugiasModule {}
