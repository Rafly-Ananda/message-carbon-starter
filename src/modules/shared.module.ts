import { Module } from "@nestjs/common";
import { MongoChatService } from "src/services/mongo/mongoose-chat/mongo-chat.service";
import { MongoMasterModule } from "./mongo/mongo-master.module";

@Module({
  imports: [
    MongoMasterModule,
  ],
  providers: [MongoChatService],
  controllers: [],
  exports: [
    MongoMasterModule,
    MongoChatService,
  ],
})
export class SharedModule {}
