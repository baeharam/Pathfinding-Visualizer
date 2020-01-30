// @flow

import {
  BOARD_ROW,
  BOARD_COL,
  VISITED_COLOR,
  CLICKED_COLOR,
} from 'constants.js';
import PathFinder from './pathFinder';

export default class BellmanFord extends PathFinder {

  _relax = (timeFactor : number) : number => {
    const { copy, dist, prev, end } = this;
  
    for(let i=0; i<BOARD_ROW; i++){
      for(let j=0; j<BOARD_COL; j++){

        let isUpdated = false;
        for(let k=0; k<PathFinder.dx.length; k++){
          const nextX = i + PathFinder.dx[k];
          const nextY = j + PathFinder.dy[k];

          if (nextX < 0 || nextX >= BOARD_ROW || nextY < 0 || nextY >= BOARD_COL) continue;
          if (dist[i][j] === Infinity || dist[i][j] + 1 >= dist[nextX][nextY]) continue;
          if (copy[nextX][nextY].color === CLICKED_COLOR) continue;

          dist[nextX][nextY] = dist[i][j] + 1;
          if (!(nextX === end.x && nextY === end.y)) {
            copy[nextX][nextY].color = VISITED_COLOR;
            copy[nextX][nextY].visit = true;
          }
          prev[nextX][nextY] = { x: i, y: j };
          isUpdated = true;
        }
        if (isUpdated) {
          this.updateBoard(timeFactor);
          timeFactor++;
        }
      }
    }
    return timeFactor;
  }

  execute = () => {
    const { copy, _relax, end } = this;
    let timeFactor = 1;
    for(let i=1; i<=copy.length-1; i++) {
      timeFactor = _relax(timeFactor);
      timeFactor++;
    }
    copy[end.x][end.y].visit = true;
    this.updateBoard(timeFactor);
  }
}