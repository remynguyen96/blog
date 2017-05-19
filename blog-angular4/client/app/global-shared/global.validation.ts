import { FormControl } from "@angular/forms";

export class ValidateService {
  static validateEmail(controlName : FormControl){
    let Email_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return Email_REGEXP.test(controlName.value) ? null : {validateEmail : true};
  }

  static validatePassword(controlName : FormControl){
    // {6,100}         - Assert password is between 4 and 100 characters
    //  (?=.*[0-9])     - Assert a string has at least one number
    //    ^                         Start anchor
    // (?=.*[A-Z].*[A-Z])        Ensure string has two uppercase letters.
    // (?=.*[!@#$&*])            Ensure string has one special case letter.
    // (?=.*[0-9].*[0-9])        Ensure string has two digits.
    // (?=.*[a-z].*[a-z].*[a-z]) Ensure string has three lowercase letters.
    // .{8}                      Ensure string is of length 8.
    // $                         End anchor.
    // ^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$

    // let Strong_Password = /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{5,30}$/;
    let Strong_Password = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,30}$/;
    return Strong_Password.test(controlName.value) ? null : {validatePassword : true};
  }

  // static confirmPassword(controlName1 : string ,controlName2 : string){
  //   return (control) => {
  //     let password = control.get(controlName1).value;
  //     let confirm = control.get(controlName2).value;
  //     return (password === confirm) ? null : {confirmPassword : true};
  //   }
  // }
  static confirmPassword(controlName1, controlName2){
      return (control) => {
          let password1 = control.get(controlName1).value;
          let password2 = control.get(controlName2).value;
          return (password1 === password2) ? null : {confirmPassword: true};
      }
  }
}
