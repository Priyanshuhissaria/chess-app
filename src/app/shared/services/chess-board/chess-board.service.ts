import { Injectable } from '@angular/core';
import { PIECES_COLOR } from '../../constants/chess-board.constant';

@Injectable()
export class ChessBoardService {
  private currentPosition: string[][] = [];
  constructor() {}

  public setCurrentPosition = (currentPosition: string[][]) => {
    this.currentPosition = currentPosition;
  };
}
