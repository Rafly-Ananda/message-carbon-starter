import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BusinessLabel } from "src/models/maria-typeorm-entities/business-label.entities";

@Injectable()
export class MariaBusinessLabelService {
  constructor(
    @InjectRepository(BusinessLabel) private businessLabelRepository:
      Repository<
        BusinessLabel
      >,
  ) {}

  async findAll(): Promise<BusinessLabel[]> {
    return this.businessLabelRepository.find();
  }
}
