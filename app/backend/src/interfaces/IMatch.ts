interface MatchAttributes {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

interface Goals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

interface NewMatch {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export {
  MatchAttributes,
  Goals,
  NewMatch,
};
