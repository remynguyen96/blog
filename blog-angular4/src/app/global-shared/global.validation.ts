import { FormControl } from "@angular/forms";

export class ValidateService {
  static validateEmail(controlName : FormControl){
    let Email_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return Email_REGEXP.test(controlName.value) ? null : {validateEmail : true};
  }

  static validatePassword(controlName : FormControl){
    // {6,100}         - Assert password is between 4 and 100 characters
   //  (?=.*[0-9])     - Assert a string has at least one number
    let Strong_Password = /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{4,100}$/;
    return Strong_Password.test(controlName.value) ? null : {validatePassword : true};
  }

  static confirmPassword(controlName1 : FormControl,controlName2 : FormControl){
    return (control) => {
      let password = control.get(controlName1).value;
      let confirm = control.get(controlName2).value;
      return (password === confirm) ? null : {confirmPassword : true};
    }
  }
}
