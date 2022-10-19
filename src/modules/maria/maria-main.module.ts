import { Module } from "@nestjs/common";
import { MariaMainController } from "src/controllers/maria/maria-main.controller";

@Module({
  imports: [],
  providers: [],
  controllers: [MariaMainController],
})
export class MariaMainModule {}
