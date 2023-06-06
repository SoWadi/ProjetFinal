import { Component } from '@angular/core';

@Component({
  selector: 'app-transposition',
  templateUrl: './transposition.component.html',
  styleUrls: ['./transposition.component.css']
})
export class TranspositionComponent {

  originalChords: string[] = [];
  transposedChords: string[] = [];

  // Autres propriétés et méthodes nécessaires...


  transposeChords(semitones: number) {
    this.transposedChords = this.originalChords.map(chord => {
      // Transposer chaque accord ici
      // Utilisez la bibliothèque teoria ou implémentez votre propre logique
      // Exemple avec teoria : return teoria.chord(chord).transpose(semitones).toString();
      return chord
    });
  }

}
