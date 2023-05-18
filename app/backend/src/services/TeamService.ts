import TeamModel from '../database/models/TeamModel';
import { TeamAttributes } from '../interfaces';

class TeamService {
  public static async getTeams(): Promise<TeamAttributes[]> {
    const teams = await TeamModel.findAll();
    return teams;
  }

  public static async getTeamById(id: number) {
    const team = await TeamModel.findOne({ where: { id } });
    return team;
  }
}

export default TeamService;
