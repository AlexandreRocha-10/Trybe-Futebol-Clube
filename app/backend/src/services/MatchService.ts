import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import { MatchAttributes, Goals, NewMatch } from '../interfaces';
import TeamService from './TeamService';

class MatchService {
  public static async getMatchs(): Promise<MatchAttributes[]> {
    const matchs = await MatchModel.findAll({
      include: [
        {
          model: TeamModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: TeamModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        }],
    });
    return matchs;
  }

  public static async getInProgress(progress: number): Promise<MatchAttributes[]> {
    const inProgressMatches = await MatchModel.findAll({
      where: {
        inProgress: progress,
      },
      include: [
        {
          model: TeamModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: TeamModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return inProgressMatches;
  }

  public static async getFinished(progress: number): Promise<MatchAttributes[]> {
    const finishedMatches = await MatchModel.findAll({
      where: {
        inProgress: progress,
      },
      include: [
        {
          model: TeamModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: TeamModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return finishedMatches;
  }

  public static async updateStatus(id: number) {
    await MatchModel.update({ inProgress: false }, { where: { id } });
    return { type: null, message: 'Finished' };
  }

  public static async updateGoals(id: number, body: Goals) {
    const { homeTeamGoals, awayTeamGoals } = body;
    await MatchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return { type: null, message: 'Updated' };
  }

  public static async addMatch({ homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals }: NewMatch) {
    const homeTeam = await TeamService.getTeamById(homeTeamId);
    const awayTeam = await TeamService.getTeamById(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { type: 'teamNotFound', message: 'There is no team with such id!' };
    }

    const newMatch = await MatchModel.create(
      { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress: true },
    );

    return { type: null, message: newMatch };
  }
}

export default MatchService;
