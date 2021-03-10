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
  respuesta: Number;
  visibility: boolean = false;
  
  constructor(private analsisSentimientoService: AnalisisSentimientoService) { }

  
  getSentimentResults(message: String): void {
    // Display our warning div if the user has introduced empty text
    if (message === "") {
      this.visibility = true;
    }
    // Asinchronous call to service which calls the API
    else {
      // Change empty-text warning visibility
      this.visibility = false;
      this.analsisSentimientoService.processText(message).subscribe(
        result => {
          this.sentimentResults = result;
          this.respuesta =  this.sentimentResults["resultado"][0];  
        });
    }
  }

  ngOnInit(): void { }
}
