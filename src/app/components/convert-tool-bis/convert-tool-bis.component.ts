import { Component, EventEmitter, Input, Output, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ConverterService } from '../services/converter.service';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AccountService } from '../services/account.service';
import { User } from 'src/app/interfaces/user';


import * as $ from "jquery"
import 'select2';

@Component({
  selector: 'app-convert-tool-bis',
  templateUrl: 'convert-tool-bis.component.html',
  styleUrls: ['convert-tool-bis.component.css'], //convert-tool-bis.component
})
export class ConvertToolBisComponent implements AfterViewInit {
  @ViewChild('selectBox') selectBoxRef!: ElementRef;
  @ViewChild('selectBox2') selectBoxRef2!: ElementRef;


  // Retrieve info from user:
  public countertraste: number = 0;


  submitted:boolean | undefined;

  transposedChords: string = "";

  //public WeFoundLove = ['Am', 'F', 'C', 'G']; //array de test
  public updatedNote: string = '';
  public updatedNotesArray?: string[] = [];
  public arrNotas: string = '';


/*   public testValue?: any;
  public testValueArr?: any;
  public testSelectedValues?:any;
  public testSelectedValuesArr?:any;
 */
  public testSelectedValues_2?:any;
  public testSelectedValuesArr_2?:any

  user?: User | null;
  success!:boolean


  constructor(
    private _service: ConverterService,
    private accountService: AccountService,
    public formBuilder: FormBuilder,
    ) {
      this.accountService.user.subscribe(x => this.user = x);
      this.success = this.accountService.success
      console.log('this.success: ', this.success );//devuelve true if register is okay

  }



  public selectedValuesArray_AfetView: any[] = [];
  public selectEventAttached = false; // Variable de drapeau pour vérifier si l'événement est déjà attaché

  // *********************************** ngAfterViewInit  **************************************
  ngAfterViewInit(): void {
    var $eventLog = $(".js-event-log");
    var $eventSelect = $(".js-example-events");

    $.fn.select2.defaults.set("width", "50%");

    $eventSelect.on("select2:open", function (e) { log("select2:open", e); });
    $eventSelect.on("select2:close", function (e) { log("select2:close", e); });
    $eventSelect.on("change", function (e) { log("change", e);

  });

/*     $eventSelect.on("select2:select", function (evt) {
      log("select2:select", evt);
      $eventSelect.append('<option value="'+evt.params.data.text+'">' +evt.params.data.text + '</option>');


    }); */


    $eventSelect.on("select2:select", (evt) => {

      log("select2:select", evt);
      $eventSelect.append('<option value="'+evt.params.data.text+'">' +evt.params.data.text + '</option>');

      // Ajouter les valeurs sélectionnées à l'array selectedValuesArray
      const element = evt.params.data.element;
      const noteSelectionItem = element.value;
      this.selectedValuesArray_AfetView.push(noteSelectionItem);
      console.log("this.selectedValuesArray_AfetView: ", this.selectedValuesArray_AfetView);

      // Réattacher l'élément à la fin du sélecteur
      $(element).appendTo($eventSelect);

      // Déclencher un "change" pour mettre à jour l'affichage
      $eventSelect.trigger("change");
    });


    $eventSelect.on("select2:unselect", (evt) => {
      // Vérifier si l'événement est déjà attaché
      const element = evt.params.data.element;
      const noteSelectionItem = element.value;

      // Recherche de l'index de l'élément dans l'array
      const index = this.selectedValuesArray_AfetView.indexOf(noteSelectionItem);

      if (index !== -1) {
        // Suppression de l'élément de l'array
        this.selectedValuesArray_AfetView.splice(index, 1);
      }});

    $eventSelect.on("select2:unselect", function (e) {
      log("select2:unselect", e);
       e.params.data.element.remove();
    });

    const log =  (name:any, evt:any) => {
      if (!evt) {
        var args = "{}";}
        // Vérifiez si la valeur est présente et ajoutez-la au tableau
  if (evt && evt.params && evt.params.data && evt.params.data.text) {
    //this.selectedValuesArray_AfetView.push(evt.params.data.text);
    console.log("selectedValuesArray_AfetView: ", this.selectedValuesArray_AfetView);
      } else {
        var args = JSON.stringify(evt.params, function (key, value) {
          if (value && value.nodeName) return "[DOM node]";
          if (value instanceof $.Event) return "[$.Event]";

          return value;
        });
      }

    }

    function formatResultData (data:any) {
      if (!data.id) return data.text;
      if (data.element.selected) return
      return data.text;
    };



    $eventSelect.select2({
      templateResult: formatResultData,
      tags: true,
    }
      );



  // *************************************************************************

  }


  //--------------------- CREATION DU FORMGROUP: capoForm: ---------------------
  public capoForm2: FormGroup = new FormGroup({
    numTraste: new FormControl(0, Validators.required),
    notasCtrl: new FormControl('', Validators.required),
  });

  //--------------------- Recupere value from capoForm: ---------------------
  public numTrasteValue = this.capoForm2.get('numTraste')?.value;
  public notasCtrlValue = this.capoForm2.get('notasCtrl')?.value;
  public transformedValue:string = ""

  public notasCtrlValueToUpperCase = this.capoForm2.get('notasCtrl')?.valueChanges.subscribe(value => {
    this.transformedValue = value?.toUpperCase();
    // Utilisez transformedValue selon vos besoins
    console.log(this.transformedValue);
  });

  public _acc: string[] = [];


  //--------------------- Recupere l'array select2: --------------------
get recupNew(){
  return [...this.selectedValuesArray_AfetView]
}


//--------------------- Recupere l'endroit du capo: ---------------------
get numTrasteValueGetter() {
  return this.numTrasteValue;
}



  // -------------- INCREASE / DECREASE CAPO POSITION --------------
  updateCapoPosition(value: number) {
    console.log('value: ', value);
    this.numTrasteValue += value;
    return this.numTrasteValue;
  }

  //--------------------- chope un array et le transpose ---------------------
  updateChordsPositionInArray(arr: string[]) {
    return arr.map((n) => this._service.transpose(n, this.numTrasteValue));
  }


  public WeFoundLoveCapo6_2: string[] = [];

  // initie le nouvel array:
  public updatedNotesArray_: string[] = [];
  public songChords: string[]= []

  onSubmit() {

    console.log("this.recupNew: ", this.recupNew);
    this.songChords = this.updateChordsPositionInArray(this.recupNew)
    console.log("songChords: ", this.songChords);

   /*  */
  }


}


/* public WeFoundLoveCapo6: any = this.WeFoundLove.map((note) =>
  this._service.transpose(note, 6)
); */

/*   public WeFoundLoveCapo6_3: string[] = this.notasCtrlArrayGetter.map((note) => {
    return this._service.transpose(note, this.numTrasteValue);
  }); */

/*
console.log("FROM ONSUBMIT: this.testSelectedValues - ", this.testSelectedValues);
console.log("this.recupereArraySelect3: ", this.recupereArraySelect3);

this.testSelectedValuesArr = this.updateChordsPositionInArray(this.recupereArraySelect3)
console.log("this.testValueArr: ", this.testSelectedValuesArr);


console.log("FROM ONSUBMIT: this.testValue - ", this.testValue);
console.log("this.recupereArraySelect2() - ", this.recupereArraySelect2);
this.updateChordsPositionInArray(this.recupereArraySelect2);
this.testValueArr = this.updateChordsPositionInArray(this.recupereArraySelect2)
console.log("this.testValueArr: ", this.testValueArr);
this.submitted = true;

this.WeFoundLoveCapo6_2 = this.updateChordsPositionInArray(
  this.notasCtrlArrayGetter
);

this.updatedNotesArray_ = this.updateChordsPositionInArray(this.notasCtrlArrayGetter_2); */

    /* var $eventLog = $(".js-event-log");
    var $eventSelect = $(".js-example-events");



    $.fn.select2.defaults.set("width", "50%");

    $eventSelect.on("select2:open", function (e) { log("select2:open", e); });
    $eventSelect.on("select2:close", function (e) { log("select2:close", e); });
    $eventSelect.on("change", function (e) { log("change"); });

    $eventSelect.on("select2:select", function(e) {
      var value = e.params.data.id;
      var selectedValues = $eventSelect.val();
      console.log("value: ", value);
      console.log("selectedValues: ", selectedValues);
      var count = 0;
      if (Array.isArray(selectedValues)) {
        count = selectedValues.reduce(function(acc, val) {
          if (val === value) {
            return acc + 1;
          } else {
            return acc;
          }
        }, 0);
      } else if (selectedValues === value) {
        count = 1;
      }
      if (count > 1) {
        e.preventDefault(); // Empêche la sélection de la même valeur
      }
    });


//??

    //var selectedValues = $eventSelect.val();

    $eventSelect.on("select2:select", function (e) {
      log("select2:select", e);
      $eventSelect.append('<option value="'+e.params.data.text+'">' +e.params.data.text + '</option>');
    });
    $eventSelect.on("select2:unselect", function (e) {
      log("select2:unselect", e);
       e.params.data.element.remove();
    });

    function log (name?:any, evt?:any) {
      if (!evt) {
        var args = "{}";
      } else {
        var args = JSON.stringify(evt.params, function (key, value) {
          if (value && value.nodeName) return "[DOM node]";
          if (value instanceof $.Event) return "[$.Event]";

          return value;
        });
      }
      var $e = $("<li>" + name + " -> " + args + "</li>");

      /* $eventLog.append($e);
      $e.animate({ opacity: 1 }, 50000, 'linear', function () {
        $e.animate({ opacity: 0 }, 2000, 'linear', function () {
          $e.remove();
        });
      });
    }

    function formatResultData (data:any) {
      if (!data.id) return data.text;
      if (data.element.selected) return
      return data.text;
    };

    $eventSelect.select2({
      templateResult: formatResultData,
      tags: true},
    );
    */
