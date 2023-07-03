
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



SAFETY LOGIN:
<div class="container col-md-6 offset-md-3 p-2 my-auto">
  <div *ngIf="error" class="alert alert-danger">{{error}}</div>
  <div *ngIf="success"  class="alert alert-success mb-5"> eargeaeaga</div>



  <div class="card">
      <h4 class="card-header">Login</h4>
      <div class="card-body">
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
              <div class="mb-3">
                  <label class="form-label">Email:</label>
                  <input type="mail" formControlName="email" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.email.errors }" />
                  <div *ngIf="submitted && f.email.errors" class="invalid-feedback">
                      <div *ngIf="f.email.errors.required">Email is required</div>
                  </div>
              </div>
              <div class="mb-3">
                  <label class="form-label">Password</label>
                  <input type="password" formControlName="password" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.password.errors }" />
                  <div *ngIf="submitted && f.password.errors" class="invalid-feedback">
                      <div *ngIf="f.password.errors.required">Password is required</div>
                  </div>
              </div>
              <div>
                <span *ngIf="loading" class="spinner-border spinner-border-sm me-1"></span>
                <button [disabled]="loading" class="btn btn-primary">
                      Login
                  </button>
                  <!-- <a routerLink="../register" class="btn btn-link">Register</a> -->
              </div>
          </form>
          <p>  Not a member yet? <a class="text-light" href="/account/register">Sign in!</a></p>
      </div>
  </div>
</div>
Por qué transponer acordes:

para ajustarse a la voz del cantante
para ajustar a otro instrumentos, por ejemplo el celo funciona con clave de fa, porque tiene una tesitura mas baja
CAPO TRANSLATER permite modificar el tono de una melodia, sin tener que limitar las posibilidades de la guitrra con una cejilla y sin tener que reafinar la guitarra



Problème : Mettez en évidence les défis auxquels les musiciens sont confrontés lorsqu'ils doivent transposer des notes, tels que les changements de tonalité et les différentes gammes utilisées.
