import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  // contents = ["Employee CRUD", "Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", 
  //             "Chapter 6", "Chapter 7", "Chapter 8", "Chapter 9", "Chapter 10", "Chapter 11",
  //             "Chapter 12"];
  // showHide :boolean = true;
  // showMap : boolean = true;
  // ngOnInit(){
  //   if (window.screen.width === 360) { // 768px portrait
  //     this.showHide = false;
  //     this.showMap = false;
  //   }
  // }
  ngOnInit(): void {

  }
  constructor(public router : Router) { }

}
