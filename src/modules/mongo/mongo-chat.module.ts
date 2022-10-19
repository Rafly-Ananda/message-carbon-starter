import { Module } from "@nestjs/common";
import { ChatController } from "../../controllers/mongo/chat.controller";
import { MongoChatService } from "../../services/mongo/mongoose-chat/mongo-chat.service";

import { MongoMasterModule } from "./mongo-master.module";

@Module({
  imports: [
    MongoMasterModule,
  ],
  providers: [MongoChatService],
  controllers: [ChatController],
})
export class MongoChatModule {}
