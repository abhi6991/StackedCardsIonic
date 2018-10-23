import { Component, ViewChild, ViewChildren, QueryList, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/Rx';
 
import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';
 
  @Component({
    selector: 'page-home',
    templateUrl: 'home.html'
  })
export class HomePage implements OnInit{
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;
  
  cards: Array<any>;
  stackConfig: StackConfig;
  recentCard: string = '';
  index: number;
  
  ngOnInit(): void {
    this.index = 0;
  }

  constructor(private http: Http) {
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }
  
  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });
    
    this.cards = [{email: ''}];
    this.addNewCards(1);
  }

  onItemMove(element, x, y, r) {
    var color = '';
    var abs = Math.abs(x);
    let min = Math.trunc(Math.min(16*16 - abs, 16*16));
    let hexCode = this.decimalToHex(min, 2);
    
    if (x < 0) {
      color = '#FF' + hexCode + hexCode;
    } else {
      color = '#' + hexCode + 'FF' + hexCode;
    }
    
    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }
   
  // Connected through HTML
  voteUp(like: boolean) {
    let removedCard = this.cards.pop();
    this.addNewCards(1);
    console.log(removedCard);
  }
   
  // Add new cards to our array
  addNewCards(count: number) {
      const result = [
        {
          name: 'Abhishek1'
        },
        {
          name: 'Abhishek2'
        },
        {
          name: 'Abhishek3'
        }
      ];
      
      this.cards.push(result[this.index]);
      this.index = (this.index + 1)%result.length;
      console.log(this.cards);
  }
   
  // http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;
    
    while (hex.length < padding) {
      hex = "0" + hex;
    }
    
    return hex;
  }
}
