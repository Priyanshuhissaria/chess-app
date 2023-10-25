import { Injectable } from '@angular/core';
import {
  CHESS_PIECES,
  NUMBER_OF_SQUARES,
  PIECES_COLOR,
} from '../../constants/chess-board.constant';

@Injectable()
export class ChessBoardService {
  private currentPosition: string[][] = [];
  constructor() {}

  public setCurrentPosition = (currentPosition: string[][]) => {
    this.currentPosition = currentPosition;
  };

  public getAvailableMoves = (
    row: number,
    col: number,
    boardConfig: PIECES_COLOR,
    playerToMove: PIECES_COLOR,
    pieceToMove: string
  ): number[][] => {
    switch (pieceToMove) {
      case CHESS_PIECES.KING:
        break;
      case CHESS_PIECES.QUEEN:
        break;
      case CHESS_PIECES.ROOK:
        return this.getRookMoves(row, col, playerToMove);
      case CHESS_PIECES.BISHOP:
        return this.getBishopMoves(row, col, playerToMove);
      case CHESS_PIECES.KNIGHT:
        break;
      case CHESS_PIECES.PAWN:
        break;
    }
    return [];
  };

  private getRookMoves = (
    row: number,
    col: number,
    playerToMove: PIECES_COLOR
  ): number[][] => {
    let ans: number[][] = [];
    for (let i = row - 1; i >= 0; i--) {
      if (this.currentPosition[i][col] == '') {
        ans.push([i, col]);
      } else {
        let color = this.currentPosition[i][col].split('-')[0];
        if (color != playerToMove) {
          ans.push([i, col]);
        }
        break;
      }
    }
    for (let i = col - 1; i >= 0; i--) {
      if (this.currentPosition[row][i] == '') {
        ans.push([row, i]);
      } else {
        let color = this.currentPosition[row][i].split('-')[0];
        if (color != playerToMove) {
          ans.push([row, i]);
        }
        break;
      }
    }
    for (let i = row + 1; i < NUMBER_OF_SQUARES; i++) {
      if (this.currentPosition[i][col] == '') {
        ans.push([i, col]);
      } else {
        let color = this.currentPosition[i][col].split('-')[0];
        if (color != playerToMove) {
          ans.push([i, col]);
        }
        break;
      }
    }
    for (let i = col + 1; i < NUMBER_OF_SQUARES; i++) {
      if (this.currentPosition[row][i] == '') {
        ans.push([row, i]);
      } else {
        let color = this.currentPosition[row][i].split('-')[0];
        if (color != playerToMove) {
          ans.push([row, i]);
        }
        break;
      }
    }

    return ans;
  };

  private getBishopMoves = (
    row: number,
    col: number,
    playerToMove: PIECES_COLOR
  ): number[][] => {
    let ans: number[][] = [];
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (this.currentPosition[i][j] == '') {
        ans.push([i, j]);
      } else {
        let color = this.currentPosition[i][j].split('-')[0];
        if (color != playerToMove) {
          ans.push([i, j]);
        }
        break;
      }
    }
    for (
      let i = row - 1, j = col + 1;
      i >= 0 && j < NUMBER_OF_SQUARES;
      i--, j++
    ) {
      if (this.currentPosition[i][j] == '') {
        ans.push([i, j]);
      } else {
        let color = this.currentPosition[i][j].split('-')[0];
        if (color != playerToMove) {
          ans.push([i, j]);
        }
        break;
      }
    }
    for (
      let i = row + 1, j = col - 1;
      i < NUMBER_OF_SQUARES && j >= 0;
      i++, j--
    ) {
      if (this.currentPosition[i][j] == '') {
        ans.push([i, j]);
      } else {
        let color = this.currentPosition[i][j].split('-')[0];
        if (color != playerToMove) {
          ans.push([i, j]);
        }
        break;
      }
    }
    for (
      let i = row + 1, j = col + 1;
      j < NUMBER_OF_SQUARES && i < NUMBER_OF_SQUARES;
      i++, j++
    ) {
      if (this.currentPosition[i][j] == '') {
        ans.push([i, j]);
      } else {
        let color = this.currentPosition[i][j].split('-')[0];
        if (color != playerToMove) {
          ans.push([i, j]);
        }
        break;
      }
    }

    return ans;
  };
}
