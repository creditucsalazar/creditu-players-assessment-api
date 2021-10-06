import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { Player } from '../schemas/player.schema';

export class GetPlayersQueryInput {
  @IsNotEmpty()
  @IsOptional()
  searchString: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  pageNumber: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  documentsPerPage: number;
}

class Pagination {
  pageNumber: number;
  documentsPerPage: number;
  numberOfDocuments: number;
}

export class GetPlayersBodyOutput {
  players: Player[];
  pagination: Pagination;
}
