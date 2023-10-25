import { Injectable } from '@angular/core';
import {
  CHESS_PIECES,
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
        break;
      case CHESS_PIECES.BISHOP:
        break;
      case CHESS_PIECES.KNIGHT:
        break;
      case CHESS_PIECES.PAWN:
        break;
    }
    return [];
  };
}
