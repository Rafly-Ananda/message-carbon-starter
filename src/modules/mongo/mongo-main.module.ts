import { Module } from "@nestjs/common";
import { MongoMainController } from "src/controllers/mongo/mongo-main.controller";

@Module({
  imports: [],
  providers: [],
  controllers: [MongoMainController],
})
export class MongoMainModule {}
