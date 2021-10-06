import { PlayersService } from './players.service';

describe('PlayersService', () => {
  let service: PlayersService;
  const playerModelMock: any = {};
  beforeEach(async () => {
    service = new PlayersService(playerModelMock);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should get players when searchString is undefined', async () => {
    playerModelMock.aggregate = jest.fn(async () => ['players']);
    const result = await service.getPlayers(undefined, 1, 10);
    expect(result).toBe('players');
    expect(playerModelMock.aggregate).toHaveBeenCalledWith([
      { $sort: { id: 1 } },
      {
        $facet: {
          players: [{ $addFields: { _id: '$_id' } }],
          numberOfDocuments: [{ $count: 'numberOfDocuments' }],
        },
      },
      { $unwind: '$numberOfDocuments' },
      {
        $project: {
          players: { $slice: ['$players', 0, 10] },
          pagination: {
            numberOfDocuments: '$numberOfDocuments.numberOfDocuments',
            documentsPerPage: { $literal: 10 },
            pageNumber: { $literal: 1 },
          },
        },
      },
    ]);
  });
  it('should get players using exact id match', async () => {
    playerModelMock.aggregate = jest.fn(async () => []);
    const result = await service.getPlayers('1234', 1, 10);
    expect(result).toMatchObject({
      players: [],
      pagination: {
        numberOfDocuments: 0,
        documentsPerPage: 10,
        pageNumber: 1,
      },
    });
    expect(playerModelMock.aggregate).toHaveBeenCalledWith([
      {
        $match: {
          $or: [
            { nickname: { $regex: '.*1234.*' } },
            { status: { $regex: '.*1234.*' } },
            { id: 1234 },
          ],
        },
      },
      { $sort: { id: 1 } },
      {
        $facet: {
          players: [{ $addFields: { _id: '$_id' } }],
          numberOfDocuments: [{ $count: 'numberOfDocuments' }],
        },
      },
      { $unwind: '$numberOfDocuments' },
      {
        $project: {
          players: { $slice: ['$players', 0, 10] },
          pagination: {
            numberOfDocuments: '$numberOfDocuments.numberOfDocuments',
            documentsPerPage: { $literal: 10 },
            pageNumber: { $literal: 1 },
          },
        },
      },
    ]);
  });
  it('should get players without exact match', async () => {
    playerModelMock.aggregate = jest.fn(async () => []);
    const result = await service.getPlayers('abcd', 1, 10);
    expect(result).toMatchObject({
      players: [],
      pagination: {
        numberOfDocuments: 0,
        documentsPerPage: 10,
        pageNumber: 1,
      },
    });
    expect(playerModelMock.aggregate).toHaveBeenCalledWith([
      {
        $match: {
          $or: [
            { nickname: { $regex: '.*abcd.*' } },
            { status: { $regex: '.*abcd.*' } },
          ],
        },
      },
      { $sort: { id: 1 } },
      {
        $facet: {
          players: [{ $addFields: { _id: '$_id' } }],
          numberOfDocuments: [{ $count: 'numberOfDocuments' }],
        },
      },
      { $unwind: '$numberOfDocuments' },
      {
        $project: {
          players: { $slice: ['$players', 0, 10] },
          pagination: {
            numberOfDocuments: '$numberOfDocuments.numberOfDocuments',
            documentsPerPage: { $literal: 10 },
            pageNumber: { $literal: 1 },
          },
        },
      },
    ]);
  });
});
