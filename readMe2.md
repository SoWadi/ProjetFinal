
 // Récupérer l'instance de Select2 from view
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

