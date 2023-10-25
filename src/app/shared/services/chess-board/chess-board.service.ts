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

  private isSquareValidForMove = (
    i: number,
    j: number,
    playerToMove: PIECES_COLOR,
    ans: number[][]
  ): boolean => {
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
