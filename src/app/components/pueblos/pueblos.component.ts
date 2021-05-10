import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pueblos',
  templateUrl: './pueblos.component.html',
  styleUrls: ['./pueblos.component.scss']
})
export class PueblosComponent implements OnInit {

  ejemplo = true;
  constructor() { }

  ngOnInit(): void {
  }

  invisible(){
    this.ejemplo = false
  }
}
