import { Module } from '@nestjs/common';
import { CirugiasModule } from './cirugias/cirugias.module';


@Module({
  imports: [CirugiasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}