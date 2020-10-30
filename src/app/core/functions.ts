import { AbstractControl, FormGroup, Validators } from "@angular/forms";


export function mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
  
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
  
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  
  export function validarCpf(controlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      if (control.value) {
        if (validaCpf(control.value)) {
          return;
        } else {
          control.setErrors({ cpfInvalido: true });
        }
      }
    };
  }
  
  export function validaCpf(cpf) {
    let add = null;
    let rev = null;
    let i = null;
    if (cpf === "") {
      return false;
    }
    // Elimina CPFs invalidos conhecidos
    if (
      cpf.length !== 11 ||
      cpf === "00000000000" ||
      cpf === "11111111111" ||
      cpf === "22222222222" ||
      cpf === "33333333333" ||
      cpf === "44444444444" ||
      cpf === "55555555555" ||
      cpf === "66666666666" ||
      cpf === "77777777777" ||
      cpf === "88888888888" ||
      cpf === "99999999999"
    ) {
      return false;
    }
    // Valida 1o digito
    add = 0;
    for (i = 0; i < 9; i++) {
      // tslint:disable-next-line: radix
      add += parseInt(cpf.charAt(i)) * (10 - i);
    }
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
      rev = 0;
    }
    // tslint:disable-next-line: radix
    if (rev !== parseInt(cpf.charAt(9))) {
      return false;
    }
    // Valida 2o digito
    add = 0;
    for (i = 0; i < 10; i++) {
      // tslint:disable-next-line: radix
      add += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
      rev = 0;
    }
    // tslint:disable-next-line: radix
    if (rev !== parseInt(cpf.charAt(10))) {
      return false;
    }
    return true;
  }
  export function validaCelular(telefone) {
    // tslint:disable-next-line: one-variable-per-declaration
    const stringFone = telefone.toString(),
      toConcat = stringFone + "";
    const checkIndex = toConcat.charAt(2);
    const checkZero = toConcat.charAt(1);
    if (toConcat.length !== 11) {
      return false;
    }
    if (checkIndex !== "9") {
      return false;
    } else {
      return true;
    }
    
  }
  export function validarCelular(controlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      if (control.value) {
        if (validaCelular(control.value)) {
          return;
        } else {
          control.setErrors({ celInvalido: true });
        }
      }
    };
  }
  