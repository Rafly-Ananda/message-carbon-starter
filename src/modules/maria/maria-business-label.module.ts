import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MariaBusinessLabelService } from "src/services/maria/maria-business-label/maria-business-label.service";
import { BusinessLabelController } from "src/controllers/maria/business-label.controllers";

// Entities
import { BusinessLabel } from "src/models/maria-typeorm-entities/business-label.entities";

@Module({
  imports: [TypeOrmModule.forFeature([BusinessLabel])],
  providers: [MariaBusinessLabelService],
  controllers: [BusinessLabelController],
})
export class MariaBusinessLabelModule {}
