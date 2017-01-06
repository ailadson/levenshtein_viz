"use strict";
import Matrix from './matrix';

export default class EditDistance {
  constructor(costs) {
    this.costs = costs;
  }

  getDistance(str1, str2) {
    var costs = [];
    var matrix = new Matrix(str1, str2);
    var m = matrix.m;

    for (var i = 1; i <= str1.length; i++) {
      for (var j = 1; j <= str2.length; j++) {
        costs[EditDistance.MAT] = m[i - 1][j - 1].cost + this.match(str1[i], str2[j]);
        costs[EditDistance.INS] = m[i][j - 1].cost + this.indel(str2[j]);
        costs[EditDistance.DEL] = m[i - 1][j].cost + this.indel(str1[i]);

        m[i][j].cost = costs[EditDistance.MAT];
        m[i][j].parent = EditDistance.MAT;

        for (var k = EditDistance.INS; k < EditDistance.DEL; k++) {
          if(costs[k] < m[i][j].cost){
            m[i][j].cost = costs[k];
            m[i][j].parent = k;
          }
        }
      }
    }

    return matrix.reconstructPath(str1, str2);
  }

  indel(char){
    return this.costs.I;
  }

  match(char1, char2){
      return (char1 === char2 ? this.costs.M : this.costs.S)
  }
}

EditDistance.MAT = 0;
EditDistance.INS = 1;
EditDistance.DEL = 2;
