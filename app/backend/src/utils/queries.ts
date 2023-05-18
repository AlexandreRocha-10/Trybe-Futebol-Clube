const homeQuery = ` SELECT
    t.team_name AS name,
    COUNT(*) AS totalGames,
    SUM(
      CASE
        WHEN m.home_team_goals > m.away_team_goals THEN 3
        WHEN m.home_team_goals = m.away_team_goals THEN 1 ELSE 0
      END
    ) AS totalPoints,
    SUM(
      CASE 
        WHEN m.home_team_id = t.id THEN m.home_team_goals ELSE m.away_team_goals 
      END
    ) AS goalsFavor,
    SUM(
      CASE 
        WHEN m.home_team_id = t.id THEN m.away_team_goals ELSE m.home_team_goals 
      END
    ) AS goalsOwn,
    SUM(
      CASE 
        WHEN m.home_team_id = t.id 
        THEN
          CASE
            WHEN m.home_team_goals > m.away_team_goals THEN 1 ELSE 0
          END
        ELSE
          CASE
            WHEN m.away_team_goals > m.home_team_goals THEN 1 ELSE 0
          END
      END
    ) AS totalVictories,
    SUM(
      CASE
        WHEN m.home_team_goals = m.away_team_goals THEN 1 ELSE 0
      END
    ) AS totalDraws,
    SUM(
      CASE 
        WHEN m.home_team_id = t.id 
        THEN
          CASE
            WHEN m.home_team_goals < m.away_team_goals THEN 1 ELSE 0
          END
        ELSE
          CASE
            WHEN m.away_team_goals < m.home_team_goals THEN 1 ELSE 0
          END
      END
    ) AS totalLosses,
    SUM(
      CASE
        WHEN m.home_team_id = t.id
        THEN m.home_team_goals - m.away_team_goals
        ELSE m.away_team_goals - m.home_team_goals
      END
    ) AS goalsBalance,
    CONCAT(FORMAT((SUM(
            CASE
              WHEN m.home_team_id = t.id
              THEN
                CASE
                  WHEN m.home_team_goals > m.away_team_goals THEN 1 ELSE 0
                END
              ELSE
                CASE
                  WHEN m.away_team_goals > m.home_team_goals THEN 1 ELSE 0
                END
            END
          ) / COUNT(*)) * 100, 2 )) AS efficiency
  FROM matches m
  INNER JOIN teams t ON m.home_team_id = t.id
  GROUP BY t.team_name
  ORDER BY totalPoints DESC;
`;

const awayQuery = ` SELECT
    t.team_name AS name,
    COUNT(*) AS totalGames,
    SUM(
      CASE
        WHEN m.away_team_goals > m.home_team_goals THEN 3
        WHEN m.away_team_goals = m.home_team_goals THEN 1 ELSE 0
      END
    ) AS totalPoints,
    SUM(
      CASE 
        WHEN m.away_team_id = t.id THEN m.away_team_goals
        ELSE m.home_team_goals
      END
    ) AS goalsFavor,
    SUM(
      CASE 
        WHEN m.away_team_id = t.id THEN m.home_team_goals
        ELSE m.away_team_goals
      END
    ) AS goalsOwn,
    SUM(
      CASE 
        WHEN m.away_team_id = t.id 
        THEN
          CASE
            WHEN m.away_team_goals > m.home_team_goals THEN 1 ELSE 0
          END
        ELSE
          CASE
            WHEN m.home_team_goals > m.away_team_goals THEN 1 ELSE 0
          END
      END
    ) AS totalVictories,
    SUM(
      CASE
        WHEN m.home_team_goals = m.away_team_goals THEN 1 ELSE 0
      END
    ) AS totalDraws,
    SUM(
      CASE 
        WHEN m.away_team_id = t.id 
        THEN
          CASE
            WHEN m.away_team_goals < m.home_team_goals THEN 1 ELSE 0
          END
        ELSE
          CASE
            WHEN m.home_team_goals < m.away_team_goals THEN 1 ELSE 0
          END
      END
    ) AS totalLosses,
    SUM(
      CASE
        WHEN m.away_team_id = t.id
        THEN m.away_team_goals - m.home_team_goals
        ELSE m.home_team_goals - m.away_team_goals
      END
    ) AS goalsBalance,
    CONCAT(FORMAT((SUM(
            CASE
              WHEN m.away_team_id = t.id
              THEN
                CASE
                  WHEN m.away_team_goals > m.home_team_goals THEN 1 ELSE 0
                END
              ELSE
                CASE
                  WHEN m.home_team_goals > m.away_team_goals THEN 1 ELSE 0
                END
            END
          ) / COUNT(*)) * 100, 2 )) AS efficiency
  FROM matches m
  INNER JOIN teams t ON m.away_team_id = t.id
  GROUP BY t.team_name
  ORDER BY totalPoints DESC;
`;

const totalQuery = ` SELECT
    t.team_name AS name,
    SUM(CASE
      WHEN m.home_team_id = t.id THEN
        CASE
          WHEN m.home_team_goals > m.away_team_goals THEN 3
          WHEN m.home_team_goals = m.away_team_goals THEN 1 ELSE 0
        END
      ELSE
        CASE
          WHEN m.away_team_goals > m.home_team_goals THEN 3
          WHEN m.away_team_goals = m.home_team_goals THEN 1 ELSE 0
        END
    END) AS totalPoints,
    COUNT(*) AS totalGames,
    SUM(CASE
      WHEN m.home_team_id = t.id THEN
        CASE
          WHEN m.home_team_goals > m.away_team_goals THEN 1 ELSE 0
        END
      ELSE
        CASE
          WHEN m.away_team_goals > m.home_team_goals THEN 1 ELSE 0
        END
    END) AS totalVictories,
    SUM(CASE
      WHEN m.home_team_id = t.id AND m.home_team_goals = m.away_team_goals THEN 1
      WHEN m.away_team_id = t.id AND m.away_team_goals = m.home_team_goals THEN 1
      ELSE 0
    END) AS totalDraws,
    SUM(CASE
      WHEN m.home_team_id = t.id THEN
        CASE
          WHEN m.home_team_goals < m.away_team_goals THEN 1
          ELSE 0
        END
      ELSE
        CASE
          WHEN m.away_team_goals < m.home_team_goals THEN 1
          ELSE 0
        END
    END) AS totalLosses,
    SUM(CASE
      WHEN m.home_team_id = t.id THEN m.home_team_goals
      ELSE m.away_team_goals
    END) AS goalsFavor,
    SUM(CASE
      WHEN m.home_team_id = t.id THEN m.away_team_goals
      ELSE m.home_team_goals
    END) AS goalsOwn,
    (SUM(CASE
      WHEN m.home_team_id = t.id THEN m.home_team_goals
      ELSE m.away_team_goals
    END) - SUM(CASE
      WHEN m.home_team_id = t.id THEN m.away_team_goals
      ELSE m.home_team_goals
    END)) AS goalsBalance,
    CONCAT(FORMAT((SUM(CASE
      WHEN m.home_team_id = t.id THEN
        CASE
          WHEN m.home_team_goals > m.away_team_goals THEN 3
          WHEN m.home_team_goals = m.away_team_goals THEN 1
          ELSE 0
        END
      ELSE
        CASE
          WHEN m.away_team_goals > m.home_team_goals THEN 3
          WHEN m.away_team_goals = m.home_team_goals THEN 1
          ELSE 0
        END
    END) / (COUNT(*) * 3) * 100), 2)) AS efficiency
  FROM teams AS t
  JOIN matches AS m ON t.id = m.home_team_id OR t.id = m.away_team_id
  WHERE m.in_progress = false
  GROUP BY t.id
  ORDER BY totalPoints DESC, goalsBalance DESC;
`;

export { homeQuery, awayQuery, totalQuery };
