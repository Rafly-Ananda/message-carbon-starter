import { Body, Controller, Get, Inject, Post, Req, Res } from "@nestjs/common";
import { AppService } from "./app.service";
import { Request, Response } from "express";
import {
  ClientProxy,
  MessagePattern,
  MqttRecordBuilder,
  Payload,
} from "@nestjs/microservices";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { MongoChatService } from "src/services/mongo/mongoose-chat/mongo-chat.service";

const forLoop = async (_) => {
  console.log("Start");

  for (let i = 0; i < 5; i++) {
    // Get num of each fruit
  }

  console.log("End");
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// controller empty means its the localhost:3030/ ( root route )
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mongoChatService: MongoChatService,
    @Inject("MQTT_SERVICE") private client: ClientProxy,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Publish mesasge to MQTT Topic
  @Get("pub-mqtt")
  publishMqtt(@Req() req: Request, @Res() res: Response) {
    console.log("PASS MQTT PUBLISHER");

    const hehe = async (param) => {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 100; j++) {
          const userProperties = { "x-version": "1.0.0" };
          const record = new MqttRecordBuilder(JSON.parse(JSON.stringify({
            "id": param + "1665371145316" + i + j,
            "type": "ChatText",
            "fromId": param + "1663228971265943" + i + j,
            "fromName": "user-test-postman",
            "sendTime": "2022-10-10T03:05:50.316255Z",
            "toId": "1662965657069591",
            "toName": "1",
            "text": "dGVzdA==",
            "caption": "",
            "roomId": "2c27a417-b056-4512-826e-22638b313a0c",
            "originality": "Original",
            "attachment": null,
            "thumbnail": null,
            "originalId": null,
            "originalMessage": null,
            "size": null,
            "mime": null,
            "longitude": null,
            "latitude": null,
            "participant": "[]",
            "isGroup": 0,
            "jojo": "jotaro kujo",
            "jake": "baldino",
          })))
            .setProperties({ userProperties })
            .setQoS(2)
            .build();
          this.client.send("business/1649040691044276c1c850/messages", record)
            .subscribe();
        }

        await sleep(100);
      }
    };

    hehe(1);
    hehe(2);
    hehe(3);

    res.status(200).json({
      message: "success",
    });
  }

  // Publish mesasge to RMQ Queue
  @Get("pub-rmq")
  publishRmq() {
    this.amqpConnection.publish(
      process.env.RMQ_EXCHANGE,
      process.env.RMQ_ROUTINGKEY_EMAIL,
      { message: "Hello rmq from sender" },
    );
  }

  // Receiving message from MQTT Topic
  @MessagePattern("business/+/messages")
  async getMQTTNotifications(
    @Payload() data: any,
  ) {
    // console.log(data);
    // console.log("PASS MQTT SUBSCRIBER");
    this.amqpConnection.publish(
      process.env.RMQ_EXCHANGE,
      process.env.RMQ_ROUTINGKEY_EMAIL,
      { data },
    );
    // console.log("PASS RABBIT MQT PUBLISHER");
  }
}
