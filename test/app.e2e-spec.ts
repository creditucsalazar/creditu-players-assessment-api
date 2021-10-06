import axios from 'axios';
import { GetPlayersBodyOutput } from 'src/players/dto/get-players.dto';
describe('Funcional test', () => {
  it('should return error 400 if no query params are given', async () => {
    let error;
    try {
      await axios.get('http://localhost:3000/players');
    } catch (e) {
      error = e;
    }
    const { response } = error;
    expect(response.status).toBe(400);
  });
  it('should return al 3000 documents if searchString is not defined', async () => {
    const result: GetPlayersBodyOutput = (
      await axios.get(
        'http://localhost:3000/players?pageNumber=1&documentsPerPage=10',
      )
    ).data;
    expect(result.players.length).toBe(10);
    expect(result.pagination.numberOfDocuments).toBe(3000);
  });
  it('should return exact match using id', async () => {
    const result: GetPlayersBodyOutput = (
      await axios.get(
        'http://localhost:3000/players?searchString=61&pageNumber=1&documentsPerPage=10',
      )
    ).data;
    expect(result.players.length).toBe(1);
    expect(result.pagination.numberOfDocuments).toBe(1);
    const [player] = result.players;
    expect(player.id).toBe(61);
  });
});
