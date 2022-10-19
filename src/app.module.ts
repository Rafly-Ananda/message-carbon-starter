import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoutingModule } from "./modules/routing.module";
import { SharedModule } from "./modules/shared.module";

@Module({
  imports: [
    SharedModule,
    RoutingModule,
    // ENV
    ConfigModule.forRoot({ isGlobal: true }),
    // Mongoose Init
    MongooseModule.forRoot(process.env.MONGODB_URI),
    // MariaDB Init
    TypeOrmModule.forRoot({
      type: "mariadb",
      host: process.env.MRYDB_HOST,
      port: process.env.MRYDB_PORT as unknown as number,
      username: process.env.MRYDB_USR,
      password: process.env.MRYDB_PSS,
      database: process.env.MRYDB_DATABASE,
      entities: [
        __dirname + "/models/maria-typeorm-entities/**/*.entity{.ts,.js}",
      ],
      autoLoadEntities: true,
      synchronize: false,
    }),
    // MQTT as Client
    ClientsModule.register([
      {
        name: "MQTT_SERVICE",
        transport: Transport.MQTT,
        options: {
          url: process.env.MQTT_HOST,
          username: process.env.MQTT_USR,
          password: process.env.MQTT_PSS,
        },
      },
    ]),
    // RMQ
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: process.env.RMQ_EXCHANGE,
          type: "x-delayed-message",
        },
      ],
      uri: process.env.RMQ_HOST,
      connectionInitOptions: { wait: false },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
