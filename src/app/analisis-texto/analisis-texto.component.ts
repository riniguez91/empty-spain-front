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
  respuesta: Number;
  visibility: boolean = false;
  
  constructor(private analsisSentimientoService: AnalisisSentimientoService) { }

  /**
   * @param message
   * After the button click event has fired due to event binding it first checks if the text to analyze is empty 
   * and if it is it uses property binding to show the warning div, else it calls the API to obtain the sentiment result
   * @returns void 
   */
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
          // API returns a JSON containing polarity and subjectivity, since we are only interested in one we obtain the frist
          this.respuesta =  this.sentimentResults["resultado"][0];  
        });
    }
  }

  ngOnInit(): void { }
}
