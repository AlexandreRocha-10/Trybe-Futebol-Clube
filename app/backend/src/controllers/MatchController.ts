import { Request, Response } from 'express';
import { MatchService } from '../services';
import { mapError } from '../utils/errorMap';

class MatchController {
  public static async getMatchs(req: Request, res: Response) {
    const progress = req.query.inProgress as string;

    if (progress !== 'false' && progress !== 'true') {
      const matchs = await MatchService.getMatchs();
      return res.status(200).json(matchs);
    }

    if (progress === 'true') {
      const inProgressMatches = await MatchService.getInProgress(1);
      return res.status(200).json(inProgressMatches);
    }

    if (progress === 'false') {
      const finishedMatches = await MatchService.getFinished(0);
      return res.status(200).json(finishedMatches);
    }
  }

  public static async updateStatus(req: Request, res: Response) {
    const { id } = req.params;
    const match = await MatchService.updateStatus(+id);
    return res.status(200).json(match);
  }

  public static async updateGoals(req: Request, res: Response) {
    const { id } = req.params;
    const { awayTeamGoals, homeTeamGoals } = req.body;
    const match = await MatchService
      .updateGoals(+id, { awayTeamGoals, homeTeamGoals });
    return res.status(200).json(match);
  }

  public static async addMatch(req: Request, res: Response) {
    const matchInfo = req.body;
    const { type, message } = await MatchService.addMatch(matchInfo);

    if (type) return res.status(mapError(type)).json({ message });

    return res.status(201).json(message);
  }
}

export default MatchController;
