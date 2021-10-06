import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player, PlayerDocument } from './schemas/player.schema';
import { GetPlayersBodyOutput } from './dto/get-players.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel(Player.name)
    private readonly playerModel: Model<PlayerDocument>,
  ) {}

  public async getPlayers(
    searchString: string,
    pageNumber: number,
    documentsPerPage: number,
  ): Promise<GetPlayersBodyOutput> {
    const isOnlyNumbers = /^[0-9]+$/.test(searchString);
    const $regex = `.*${searchString}.*`;
    const $or: Array<Record<string, any>> = [
      { nickname: { $regex } },
      { status: { $regex } },
    ];
    if (isOnlyNumbers) {
      $or.push({ id: parseInt(searchString) });
    }
    const pipeline = [];
    if (searchString !== undefined) {
      pipeline.push({ $match: { $or } });
    }
    pipeline.push(
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
          players: {
            $slice: [
              '$players',
              (pageNumber - 1) * documentsPerPage,
              documentsPerPage,
            ],
          },
          pagination: {
            numberOfDocuments: '$numberOfDocuments.numberOfDocuments',
            pageNumber: { $literal: pageNumber },
            documentsPerPage: { $literal: documentsPerPage },
          },
        },
      },
    );
    const [result] = await this.playerModel.aggregate(pipeline);
    if (!result) {
      return {
        players: [],
        pagination: {
          numberOfDocuments: 0,
          pageNumber,
          documentsPerPage,
        },
      };
    }
    return result;
  }
}
