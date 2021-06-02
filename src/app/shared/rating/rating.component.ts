import { ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Output() rated = new EventEmitter<number>()

  rate:number = 0

  rateArr:number[] = [1,2,3,4,5]

  previous:number = undefined

  constructor() { }

  ngOnInit() {
  }

  setRate(r:number){
    this.rate = r
    this.setPrevious(undefined)
    this.rated.emit(this.rate)
  }

  tempRate(r:number){
    if(this.previous === undefined){
      this.setPrevious(this.rate)
    }
    this.rate = r
  }

  clearTempRate(){
    this.rate = this.previous
    this.previous = undefined
  }

  setPrevious(r:number){
    this.previous = r
  }
}
