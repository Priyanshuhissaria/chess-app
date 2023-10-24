import { Component, OnInit } from '@angular/core';
import { DEFAULT_INITIAL_BLACK_POSITION, DEFAULT_INITIAL_WHITE_POSITION } from '../../constants/chess-board.constant';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent implements OnInit{
  public initialPosition : string[][] = [];
  constructor(){};
  ngOnInit(): void {
    this.initialPosition = DEFAULT_INITIAL_WHITE_POSITION;
  }

}
