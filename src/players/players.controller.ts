import { Controller, Get, Query } from '@nestjs/common';
import {
  GetPlayersBodyOutput,
  GetPlayersQueryInput,
} from './dto/get-players.dto';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  public async getPlayers(
    @Query() query: GetPlayersQueryInput,
  ): Promise<GetPlayersBodyOutput> {
    const { searchString, pageNumber, documentsPerPage } = query;
    return await this.playersService.getPlayers(
      searchString,
      pageNumber,
      documentsPerPage,
    );
  }
}
