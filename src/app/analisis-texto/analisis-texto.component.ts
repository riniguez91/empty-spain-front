import { Component, OnInit } from '@angular/core';
import { AnalisisSentimientoService } from '../services/analisis-sentimiento.service'

@Component({
  selector: 'app-analisis-texto',
  templateUrl: './analisis-texto.component.html',
  styleUrls: ['./analisis-texto.component.scss']
})
export class AnalisisTextoComponent implements OnInit {

  sentimentResults: number[];

  constructor(private analsisSentimientoService: AnalisisSentimientoService) { }

  // We can probably remove this function and incorporate it directly into the ngOnInit(), but for modularity we will mantain this 
  // for now
  getSentimentResults(): void {
    this.analsisSentimientoService.getSentimentResults().subscribe(
      result => this.sentimentResults = result
    );
  }

  ngOnInit(): void {
    this.getSentimentResults();
  }
}
