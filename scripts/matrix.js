"use strict";

import EditDistance from './levenshtein_distance';

export default class Matrix {
    constructor(str1, str2) {
      this.m = [];

      for (var i = 0; i <= str1.length; i++) {
        this.m[i] = [];
        for (var j = 0; j <= str2.length; j++) {
          this.m[i][j] = { cost : null, parent : null };
          if(i === 0) { this.rowInit(j) };
        }
        this.colInit(i);
      }
    }

    rowInit(i){
      this.m[0][i].cost = i;

      if(i === 0) {
        this.m[0][i].parent = -1
      } else {
        this.m[0][i].parent = EditDistance.INS
      }
    }

    colInit(i){
      this.m[i][0].cost = i;

      if(i === 0) {
        this.m[i][0].parent = -1
      } else {
        this.m[i][0].parent = EditDistance.DEL
      }
    }

    reconstructPath(str1, str2, idx1, idx2) {
      idx1 = (idx1 === undefined ? str1.length - 1 : idx1)
      idx2 = (idx2 === undefined ? str2.length - 1 : idx2)

      if(this.m[idx1][idx2].parent == -1){
        return "";
      }

      if(this.m[idx1][idx2].parent == EditDistance.MAT){
        var path = this.reconstructPath(str1, str2, idx1 - 1, idx2 - 1)
        return path + this.matchOut(str1[idx1], str2[idx2]);
      }

      if(this.m[idx1][idx2].parent == EditDistance.INS){
        var path = this.reconstructPath(str1, str2, idx1, idx2 - 1)
        return path + this.insertOut(str2[idx2]);
      }

      if(this.m[idx1][idx2].parent == EditDistance.DEL){
        var path = this.reconstructPath(str1, str2, idx1 - 1, idx2)
        return path + this.deleteOut(str1[idx1]);
      }
    }

    matchOut(char1, char2) {
      return (char1 === char2 ? "M" : "S")
    }

    insertOut(char) {
      return "I"
    }

    deleteOut(char) {
      return "D"
    }
}
