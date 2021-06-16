import { Component, OnInit } from '@angular/core';
import { ExamenPc3Service } from 'src/app/services/examen-pc3.service';

@Component({
  selector: 'app-examen-pc3',
  templateUrl: './examen-pc3.component.html',
  styleUrls: ['./examen-pc3.component.scss']
})
export class ExamenPc3Component implements OnInit {

  constructor(private examenService: ExamenPc3Service) { }

  ngOnInit(): void {
    let body = {"townId": 2045};
    this.examenService.getTwitter(body).subscribe(
      result => {
        console.log(result);
        this.examenService.getTwitterExamen(body).subscribe(
          result => {
            console.log(result);
          }
        )
      }
    )
  }

}
