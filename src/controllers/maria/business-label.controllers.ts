import { Body, Controller, Get, Inject, Post, Req, Res } from "@nestjs/common";
import { MariaBusinessLabelService } from "src/services/maria/maria-business-label/maria-business-label.service";
import { Request, Response } from "express";

// controller empty means its the localhost:3030/ ( root route )
@Controller()
export class BusinessLabelController {
  constructor(
    private readonly mariaBusinessLabelService: MariaBusinessLabelService,
  ) {}

  @Get()
  async getHelloMrdb(@Req() req: Request, @Res() res: Response): Promise<void> {
    const result = await this.mariaBusinessLabelService.findAll();
    res.status(200).json(result);
  }
}
