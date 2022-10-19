import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { json, urlencoded } from "express";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true, limit: "50mb" }));

  // MQTT INIT as Provider
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: process.env.MQTT_HOST,
      username: process.env.MQTT_USR,
      password: process.env.MQTT_PSS,
    },
  });

  await app.startAllMicroservices();

  await app.listen(process.env.PORT, () => {
    console.log(`Running on port ${process.env.PORT}`);
  });
}
bootstrap();
