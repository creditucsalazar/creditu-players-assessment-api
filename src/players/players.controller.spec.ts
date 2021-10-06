import { PlayersController } from './players.controller';

describe('PlayersController', () => {
  let controller: PlayersController;
  const playersServiceMock: any = {};
  beforeEach(async () => {
    controller = new PlayersController(playersServiceMock);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get players from query', async () => {
    playersServiceMock.getPlayers = jest.fn(async () => 'players');

    const query = {
      searchString: 'searchString',
      pageNumber: 2,
      documentsPerPage: 5,
    };
    const result = await controller.getPlayers(query);

    expect(result).toBe('players');
    expect(playersServiceMock.getPlayers).toHaveBeenCalledWith(
      'searchString',
      2,
      5,
    );
  });
});
