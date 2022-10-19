import { ObjectID } from "typeorm";

export class CreateUserDto {
  _id: ObjectID;
  name: string;
  city: string;
}
