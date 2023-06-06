import { Component, EventEmitter, Input, Output, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ConverterService } from '../services/converter.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AccountService } from '../services/account.service';
import { User } from 'src/app/interfaces/user';


import * as $ from "jquery"
import 'select2';

@Component({
  selector: 'app-convert-tool',
  templateUrl: './convert-tool.component.html',
  styleUrls: ['./convert-tool.component.css'],
})
export class ConvertToolComponent implements AfterViewInit {
  @ViewChild('selectBox') selectBoxRef!: ElementRef;
  @ViewChild('selectBox2') selectBoxRef2!: ElementRef;


  // Retrieve info from user:
  public countertraste: number = 0;

  @Input()
  public placeholder: string = '';


  submitted:boolean | undefined;

  transposedChords: string = "";

  public WeFoundLove = ['Am', 'F', 'C', 'G']; //array de test
  public updatedNote: string = '';
  public updatedNotesArray?: string[] = [];
  public arrNotas: string = '';


  public testValue?: any;
  public testValueArr?: any;
  public testSelectedValues?:any;
  public testSelectedValuesArr?:any;

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



  // *********************************** ngAfterViewInit  **************************************
  ngAfterViewInit(): void {
 // Récupérer l'instance de Select2
 const select2Instance = $(this.selectBoxRef2.nativeElement);

 // Modifier les options pour autoriser la sélection multiple de la même valeur


// Modifier les options pour autoriser la sélection multiple de la même valeur
// Modifier les options pour autoriser la sélection multiple de la même valeur
select2Instance.select2({
  tags: true,
});


//CHOOPE LA NOTE ET SHOW L'ARRAY EN ENTIER
$(select2Instance).on('change', () => {

  const value = $(selectBox).val();
  console.log("value select2Instance: ", value);
});


$(select2Instance).on('change', () => {
  this.testSelectedValues = $(select2Instance).val();
  console.log(this.testSelectedValues);
  this.testSelectedValuesArr = this.testSelectedValues.map((note: string) => this._service.transpose(note, this.numTrasteValue))
  console.log(this.testSelectedValuesArr);
});

// conserver l'ordre chronologique de la saisie:
$(select2Instance).select2();

$(select2Instance).on("select2:select", function (evt) {
  var element = evt.params.data.element;
  var $element = $(element);

  $element.detach();
  $(this).append($element);
  $(this).trigger("change");
});


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





// SAFETY:

    const selectBox = this.selectBoxRef?.nativeElement;

    $(selectBox).select2({
      multiple: true
    }).on("select2:select", function(e) {
      var value = e.params.data.id;
      $(this).append(new Option(value, value, true,)).trigger("change");
    });

//CHOOPE LA NOTE ET SHOW L'ARRAY EN ENTIER
    $(selectBox).on('change', () => {

      const value = $(selectBox).val();
      console.log("value SAFETY: ", value);
    });

    $(selectBox).on('change', () => {
      this.testValue = $(selectBox).val();
      console.log(this.testValue);
      this.testValueArr = this.testValue.map((note: string) => this._service.transpose(note, this.numTrasteValue))
      console.log(this.testValueArr);
    });

    // conserver l'ordre chronologique de la saisie:
    $(selectBox).select2();

    $(selectBox).on("select2:select", function (evt) {
      var element = evt.params.data.element;
      var $element = $(element);

      $element.detach();
      $(this).append($element);
      $(this).trigger("change");
    });



  }



  //--------------------- CREATION DU FORMGROUP: capoForm: ---------------------
  public capoForm: FormGroup = new FormGroup({
    numTraste: new FormControl(0, Validators.required),
    notasCtrl: new FormControl('', Validators.required),
  });

  //--------------------- Recupere value from capoForm: ---------------------
  public numTrasteValue = this.capoForm.get('numTraste')?.value;
  public notasCtrlValue = this.capoForm.get('notasCtrl')?.value;
  public transformedValue:string = ""

  public notasCtrlValueToUpperCase = this.capoForm.get('notasCtrl')?.valueChanges.subscribe(value => {
    this.transformedValue = value?.toUpperCase();
    // Utilisez transformedValue selon vos besoins
    console.log(this.transformedValue);
  });

  public _acc: string[] = [];


  //--------------------- Recupere l'array select2: ---------------------

get recupereArraySelect2() {
  return this.testValue
}
get recupereArraySelect3() {
  return this.testSelectedValues
}

  //--------------------- Recupere l'endroit du capo: ---------------------
  get numTrasteValueGetter() {
    return this.numTrasteValue;
  }

  get notasCtrlValueGetter() {
    this.notasCtrlValue = this.capoForm.get('notasCtrl')?.value;;
    return this.notasCtrlValue
  }


  get notasCtrlArrayGetterToUpperCase(): string[] {
    this.notasCtrlValue = this.capoForm.get('notasCtrl')?.value;
    return this.transposedChords.split(' ').map((item: string) => item.trim());
  }
  get notasCtrlArrayGetter(): string[] {
    this.notasCtrlValue = this.capoForm.get('notasCtrl')?.value;
    return this.capoForm.get('notasCtrl')?.value?.split(' ').map((item: string) => item.trim());
  }
  get notasCtrlArrayGetter_2(): string[] {
    //this.notasCtrlValue = this.capoForm.get('notasCtrl')?.value;
    return this.transformedValue.split(' ').map((item: string) => item.trim());
  }

  set theAcc(acc: string[]) {
    this._acc = acc?.map(a => a.toUpperCase());
    console.log('this._acc - ', this._acc);
    console.log("typeof this._acc: ", typeof acc);
  }

  // -------------- INCREASE / DECREASE CAPO POSITION --------------
  updateCapoPosition(value: number) {
    console.log('value: ', value);

    this.numTrasteValue += value;

    return this.updatedNote;
  }

  //--------------------- chope un array et le transpose ---------------------
  updateChordsPositionInArray(arr: string[]) {
    return arr.map((n) => this._service.transpose(n, this.numTrasteValue));
  }


  public WeFoundLoveCapo6_2: string[] = [];

  // initie le nouvel array:
  public updatedNotesArray_: string[] = [];

  onSubmit() {
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

    this.updatedNotesArray_ = this.updateChordsPositionInArray(this.notasCtrlArrayGetter_2);
  }

  public WeFoundLoveCapo6: any = this.WeFoundLove.map((note) =>
    this._service.transpose(note, 6)
  );

  public WeFoundLoveCapo6_3: string[] = this.notasCtrlArrayGetter.map((note) => {

    //console.log('this.notasCtrlArrayGetter: ', this.notasCtrlValue);
    return this._service.transpose(note, this.numTrasteValue);
  });
}


