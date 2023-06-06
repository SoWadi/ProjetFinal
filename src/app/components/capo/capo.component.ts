import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConverterService } from '../services/converter.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-capo',
  templateUrl: './capo.component.html',
  styleUrls: ['./capo.component.css']
})
export class CapoComponent {
  inputTextValue: any;
  transpositionValue: any;

  transposeChord(chord: string, transposition: number): string {
    // Conversion des accords en nombres correspondants
    const chordValues: { [key: string]: number } = {
      'a': 0,
      'a#': 1,
      'b': 2,
      'c': 3,
      'c#': 4,
      'd': 5,
      'd#': 6,
      'e': 7,
      'f': 8,
      'f#': 9,
      'g': 10,
      'g#': 11
    };

    // Transposition de l'accord
    const chordValue = chordValues[chord.toLowerCase()];
    const transposedValue = (chordValue + transposition) % 12;

    // Conversion du nombre transposé en accord correspondant
    const transposedChord = Object.keys(chordValues).find(key => chordValues[key] === transposedValue);

    if (transposedChord) {
      return transposedChord.toUpperCase();
    } else {
      return '';
    }
  }

  capoForm: FormGroup;
  transposedChords: string[] = [];
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
    this.capoForm = this.formBuilder.group({
      inputText: [''],
      transposition: [0],
    });
  }

  get inputTextGetter(){
    return this.inputTextValue = this.capoForm.get('inputText')?.value;

  }

  get transpositionGetter(){
    return this.transpositionValue = this.capoForm.get('inputText')?.value;

  }

  onSubmit() {
/*     const inputTextValue = this.capoForm.get('inputText')?.value;
    const transpositionValue = +this.capoForm.get('transposition')?.value; */
    const chordsArray = this.inputTextGetter.split(',').map((item: string) => item.trim());
    this.transposedChords = chordsArray.map((chord: string) => this.transposeChord(chord, this.transpositionGetter));
    console.log("this.transposedChords: ", this.transposedChords);
    this.submitted = true;
  }
/*
  transposeChord(chord: string, transposition: number): string {
    // Votre logique de transposition des accords ici
    // Par exemple, vous pouvez utiliser une bibliothèque externe ou implémenter votre propre logique
    // pour transposer les accords selon la valeur de transposition fournie.
    // Retournez l'accord transposé.
    return chord + ' transposé de ' + transposition;
  } */

}








