import { DIJKSTRA, BELLMAN_FORD, A_STAR } from 'constants.js';
import Dijkstra from './dijkstra';
import BellmanFord from './bellmanFord';
import AStar from './AStar';

const Pathfinder = {
  [DIJKSTRA]: Dijkstra,
  [BELLMAN_FORD]: BellmanFord,
  [A_STAR]: AStar
};

export default Pathfinder;