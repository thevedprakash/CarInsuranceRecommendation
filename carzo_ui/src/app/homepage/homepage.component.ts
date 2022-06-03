import { Component, OnInit,Renderer2,OnDestroy } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  
  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'home-bg');
   }
  
  ngOnInit() {
  }
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'home-bg');
  }
  
}
