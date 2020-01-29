import { DIJKSTRA, BELLMAN_FORD } from 'constants.js';
import Dijkstra from './dijkstra';
import BellmanFord from './bellmanFord';

const Pathfinder = {
  [DIJKSTRA]: Dijkstra,
  [BELLMAN_FORD]: BellmanFord
};

export default Pathfinder;