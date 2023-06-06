import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  public testin:string = "coucou from ConverterService";
  logIt(){ console.log(this.testin)};


  constructor() { }

  transpose(chord:string, increment:number){
  const cycle = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

  var nota = chord.charAt(0);

  //console.log("chord.charAt(0) : ", chord.charAt(1));
  if(chord.length > 1 && chord.charAt(1) == '#')
  {
      nota += "#";
  }
  var ind = [...cycle].indexOf(nota);
  var newInd = (ind + increment + cycle.length) % cycle.length;
  var newChord = cycle[newInd];
  //console.log(newChord);
  return newChord + chord.substring(nota.length);
}


  public capo!: number;

  private numero?: number;
  setNumero(numero: number) {
    this.numero = numero;
  }

  getNumero() {
    return this.numero;
  }
}
