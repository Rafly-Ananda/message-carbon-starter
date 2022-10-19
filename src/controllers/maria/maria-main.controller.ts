import { Body, Controller, Get, Inject, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

// controller empty means its the localhost:3030/ ( root route )
@Controller()
export class MariaMainController {
  constructor() {}

  @Get()
  async getHelloMrdb(@Req() req: Request, @Res() res: Response): Promise<void> {
    res.status(200).json("Maria Index Route");
  }
}
