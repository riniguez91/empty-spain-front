import { Component, OnInit } from '@angular/core';
import { AnalisisSentimientoService } from '../services/analisis-sentimiento.service'
import { NgModule } from '@angular/core'

@Component({
  selector: 'app-analisis-texto',
  templateUrl: './analisis-texto.component.html',
  styleUrls: ['./analisis-texto.component.scss']
})

export class AnalisisTextoComponent implements OnInit {

  sentimentResults: Object[];
  messageToProcess: String;

  constructor(private analsisSentimientoService: AnalisisSentimientoService) { }

  
  getSentimentResults(message: String): void {
    // Create an alert of sorts here
    if (message === "") { console.log("No mola tio"); }
    // Asinchronous call to service which calls the API
    else {
      this.analsisSentimientoService.processText(message).subscribe(
        result => {
          this.sentimentResults = result;
          console.log(this.sentimentResults);
          
        });
    }
  }

  ngOnInit(): void { }
}
