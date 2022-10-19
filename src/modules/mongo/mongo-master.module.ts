import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Chat,
  ChatSchema,
} from "../../models/mongo-mongoose-schemas/mongoose-chat.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
  providers: [],
  controllers: [],
  exports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
})
export class MongoMasterModule {}
