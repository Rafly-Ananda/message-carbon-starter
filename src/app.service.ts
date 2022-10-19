import { Injectable } from "@nestjs/common";
import { Nack, RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { ConsumeMessage } from "amqplib";
import { MongoChatService } from "src/services/mongo/mongoose-chat/mongo-chat.service";

// Dotenv
require("dotenv").config();

@Injectable()
export class AppService {
  constructor(private readonly mongoChatService: MongoChatService) {
  }

  getHello(): string {
    return "Hello World!";
  }

  // Receiving message from RMQ Queue
  @RabbitSubscribe({
    exchange: process.env.RMQ_EXCHANGE,
    routingKey: process.env.RMQ_ROUTINGKEY_EMAIL,
    queue: process.env.RMQ_EMAIL_QUEUE,
    allowNonJsonMessages: true,
    createQueueIfNotExists: false,
    queueOptions: {
      durable: true,
    },
  })
  public async rmqSubHandler(msg: { data: any }, amqpMsg: ConsumeMessage) {
    try {
      await this.mongoChatService.create(msg.data);
      console.log("saved");
    } catch (e) {
      console.log("dups");
      const errorMessage = e.message.split(" ");
      if (errorMessage.includes("duplicate")) {
        await this.mongoChatService.findOneAndUpdate(
          msg.data.id,
          msg.data.fromId,
          msg.data,
        );
      }
    }
  }
}
