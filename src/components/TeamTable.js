import React from 'react';

const TeamTable = ({ teamStructure, indexSub, levelCounts, completedCounts }) => {
  if (!teamStructure) {
    return null;
  }

  // Update level counts and completed counts
  levelCounts[indexSub] = (levelCounts[indexSub] || 0) + 1;
  if (teamStructure.activeStatus === 'Completed') {
    completedCounts[indexSub] = (completedCounts[indexSub] || 0) + 1;
  }

  return (
    <div className='table-responsive table-bordered'>
      <table className='table '>
        <thead className='text-light'>
          <tr>
            <th>#</th>
            <th>User ID</th>
            <th>Level</th>
            <th>Task Status</th>
            <th>Level Count</th>
            <th>Completed Count</th>
          </tr>
        </thead>
        <tbody className='text-light'>
          <tr>
            <td>{indexSub}</td>
            <td>{teamStructure.userId}</td>
            <td>{teamStructure.level}</td>
            <td>{teamStructure.activeStatus}</td>
            <td>{levelCounts[indexSub] || 0}</td>
            <td>{completedCounts[indexSub] || 0}</td>
          </tr>
          {teamStructure.downline &&
            teamStructure.downline.map((subTeam, index) => (
              <TeamTable
                key={index}
                indexSub={index}
                teamStructure={subTeam}
                levelCounts={levelCounts}
                completedCounts={completedCounts}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamTable;
