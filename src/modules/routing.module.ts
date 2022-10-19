import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";

import { MongoMainModule } from "./mongo/mongo-main.module";
import { MongoChatModule } from "./mongo/mongo-chat.module";

import { MariaMainModule } from "./maria/maria-main.module";
import { MariaBusinessLabelModule } from "./maria/maria-business-label.module";

const routes = [
  {
    path: "maria",
    module: MariaMainModule,
    children: [
      {
        path: "business-label",
        module: MariaBusinessLabelModule,
      },
    ],
  },
  {
    path: "mongo",
    module: MongoMainModule,
    children: [
      {
        path: "chat",
        module: MongoChatModule,
      },
    ],
  },
];

@Module({
  imports: [
    // Maria entry module
    MariaMainModule,
    MariaBusinessLabelModule,
    // Mongo entry module
    MongoMainModule,
    MongoChatModule,
    // Routing
    RouterModule.register(routes),
  ],
  exports: [
    // Routing
    RouterModule.register(routes),
  ],
})
export class RoutingModule {}
