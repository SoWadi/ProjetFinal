import { Component } from '@angular/core';

import { note, interval, transpose, distance } from "@tonaljs/core";
import { Key, Note, Scale } from 'tonal';

@Component({
  selector: 'app-random-tunes',
  templateUrl: './random-tunes.component.html',
  styleUrls: ['./random-tunes.component.css']
})
export class RandomTunesComponent {

  //transposedNote: string;

  constructor() {

    //this.transposedNote = transpose('C4', '5P'); ==> TEST
  }
  ngOnInit(): void {
/*     const originalChords = ["A", "F", "C"];
    const transposedChords = originalChords.map(chord => transpose(chord, '6P'));
 */
}

public choixGamme:any;
public choixModalite:any;
public resultado!:string;
public chordsProgression!: string;
  public arr: any[] = [];

    chosenGamme = () => {
  this.choixGamme = this.objNotesMineur[Math.floor(Math.random() * 12)].note;
  console.log(this.choixGamme);
  this.choixModalite = Math.floor(Math.random() * 2);
  let modalite = this.choixModalite === 0? "major":"minor"
  console.log(modalite);
  console.log("`${this.choixGamme} ${modalite}`", `${this.choixGamme} ${modalite}`);
  this.resultado = `${this.choixGamme} ${modalite}`
  console.log("this.resultado: ", this.resultado);

  let choixEtModalite =  Scale.degrees(this.resultado);


  console.log(choixEtModalite(1), choixEtModalite(4), choixEtModalite(1), choixEtModalite(5));
  this.chordsProgression = choixEtModalite(1) + " " + choixEtModalite(4) +" " + choixEtModalite(1) +" " + choixEtModalite(5)

  console.log('Key.majorKey("this.choixGamme"): ',
  Key.majorKey(this.choixGamme).triads[0],
  Key.majorKey(this.choixGamme).triads[3],
  Key.majorKey(this.choixGamme).triads[0],
  Key.majorKey(this.choixGamme).triads[4]);

  console.log('Key.min("this.choixGamme"): ',
  Key.minorKey(this.choixGamme).natural.triads[0],
  Key.minorKey(this.choixGamme).natural.triads[1],
  Key.minorKey(this.choixGamme).natural.triads[2],
  Key.minorKey(this.choixGamme).natural.triads[3],
  Key.minorKey(this.choixGamme).natural.triads[0],
  Key.minorKey(this.choixGamme).natural.triads[4]);

};

//console.log(choixGamme);

public objNotesMineur  = [
  {note: "A", position: 1},
  {note: "A#", position: 2},
  {note: "B", position: 3},
  {note: "C", position: 4},
  {note: "C#", position: 5},
  {note: "D", position: 6},
  {note: "D#", position: 7},
  {note: "E", position: 8},
  {note: "F", position: 9},
  {note: "F#", position: 10},
  {note: "G", position: 11},
  {note: "G#", position: 12},
];


}
