import { Request, Response } from 'express';
import { TeamService } from '../services';

class TeamController {
  public static async getTeams(_req: Request, res: Response) {
    const teams = await TeamService.getTeams();
    return res.status(200).json(teams);
  }

  public static async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamService.getTeamById(+id);
    return res.status(200).json(team);
  }
}

export default TeamController;
