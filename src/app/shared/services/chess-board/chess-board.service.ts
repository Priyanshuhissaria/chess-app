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
        return this.getQueenMoves(row, col, playerToMove);
      case CHESS_PIECES.ROOK:
        return this.getRookMoves(row, col, playerToMove);
      case CHESS_PIECES.BISHOP:
        return this.getBishopMoves(row, col, playerToMove);
      case CHESS_PIECES.KNIGHT:
        return this.getKnightMoves(row, col, playerToMove);
      case CHESS_PIECES.PAWN:
        return this.getPawnMoves(row, col, boardConfig, playerToMove);
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
      if (!this.isSquareValidForMove(i, col, playerToMove, ans)) break;
    }
    for (let i = col - 1; i >= 0; i--) {
      if (!this.isSquareValidForMove(row, i, playerToMove, ans)) break;
    }
    for (let i = row + 1; i < NUMBER_OF_SQUARES; i++) {
      if (!this.isSquareValidForMove(i, col, playerToMove, ans)) break;
    }
    for (let i = col + 1; i < NUMBER_OF_SQUARES; i++) {
      if (!this.isSquareValidForMove(row, i, playerToMove, ans)) break;
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
      if (!this.isSquareValidForMove(i, j, playerToMove, ans)) break;
    }
    for (
      let i = row - 1, j = col + 1;
      i >= 0 && j < NUMBER_OF_SQUARES;
      i--, j++
    ) {
      if (!this.isSquareValidForMove(i, j, playerToMove, ans)) break;
    }
    for (
      let i = row + 1, j = col - 1;
      i < NUMBER_OF_SQUARES && j >= 0;
      i++, j--
    ) {
      if (!this.isSquareValidForMove(i, j, playerToMove, ans)) break;
    }
    for (
      let i = row + 1, j = col + 1;
      j < NUMBER_OF_SQUARES && i < NUMBER_OF_SQUARES;
      i++, j++
    ) {
      if (!this.isSquareValidForMove(i, j, playerToMove, ans)) break;
    }

    return ans;
  };

  private getQueenMoves = (
    row: number,
    col: number,
    playerToMove: PIECES_COLOR
  ): number[][] => {
    let ans: number[][] = [];
    const horizontalMoves = this.getRookMoves(row, col, playerToMove);
    const diagonalMoves = this.getBishopMoves(row, col, playerToMove);
    ans = horizontalMoves.concat(diagonalMoves);
    return ans;
  };

  private getKnightMoves = (
    row: number,
    col: number,
    playerToMove: PIECES_COLOR
  ): number[][] => {
    let ans: number[][] = [];
    const knightPossibleMoves = [
      [row + 2, col + 1],
      [row + 2, col - 1],
      [row - 2, col + 1],
      [row - 2, col - 1],
      [row + 1, col + 2],
      [row + 1, col - 2],
      [row - 1, col + 2],
      [row - 1, col - 2],
    ];
    knightPossibleMoves.forEach((square) => {
      this.isSquareValidForMove(square[0], square[1], playerToMove, ans);
    });
    return ans;
  };

  private getPawnMoves = (
    row: number,
    col: number,
    boardConfig: PIECES_COLOR,
    playerToMove: PIECES_COLOR
  ): number[][] => {
    let ans: number[][] = [];
    //determining whether pawn will move up or down
    const movementDirection = boardConfig == playerToMove ? 'up' : 'down';
    switch (movementDirection) {
      case 'up':
        {
          //checking for capture squares
          if (col != 0 && this.currentPosition[row - 1][col - 1] != '') {
            const color = this.currentPosition[row - 1][col - 1].split('-')[0];
            if (color != playerToMove) {
              ans.push([row - 1, col - 1]);
            }
          }
          if (
            col != NUMBER_OF_SQUARES - 1 &&
            this.currentPosition[row - 1][col + 1] != ''
          ) {
            const color = this.currentPosition[row - 1][col + 1].split('-')[0];
            if (color != playerToMove) {
              ans.push([row - 1, col + 1]);
            }
          }
          //checking for normal pawn moves
          if (this.currentPosition[row - 1][col] != '') return ans;
          ans.push([row - 1, col]);
          //checking if 2 square move is possible (initial square)
          if (row == 6) {
            if (this.currentPosition[row - 2][col] == '')
              ans.push([row - 2, col]);
          }
        }
        break;
      case 'down':
        {
          //checking for capture squares
          if (col != 0 && this.currentPosition[row + 1][col - 1] != '') {
            const color = this.currentPosition[row + 1][col - 1].split('-')[0];
            if (color != playerToMove) {
              ans.push([row + 1, col - 1]);
            }
          }
          if (
            col != NUMBER_OF_SQUARES - 1 &&
            this.currentPosition[row + 1][col + 1] != ''
          ) {
            const color = this.currentPosition[row + 1][col + 1].split('-')[0];
            if (color != playerToMove) {
              ans.push([row + 1, col + 1]);
            }
          }
          //checking for normal pawn moves
          if (this.currentPosition[row + 1][col] != '') return ans;
          ans.push([row + 1, col]);
          //checking if 2 square move is possible (initial square)
          if (row == 1) {
            if (this.currentPosition[row + 2][col] == '')
              ans.push([row + 2, col]);
          }
        }
        break;
    }
    return ans;
  };

  private isSquareValidForMove = (
    i: number,
    j: number,
    playerToMove: PIECES_COLOR,
    ans: number[][]
  ): boolean => {
    if (i < 0 || j < 0 || i >= NUMBER_OF_SQUARES || j >= NUMBER_OF_SQUARES)
      return false;
    if (this.currentPosition[i][j] == '') {
      ans.push([i, j]);
      return true;
    }
    let color = this.currentPosition[i][j].split('-')[0];
    if (color != playerToMove) {
      ans.push([i, j]);
    }
    return false;
  };
}
