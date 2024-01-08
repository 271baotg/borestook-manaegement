//Name 
interface INameValidation {
    isLongEnough: Function;
}

class NameValidator implements INameValidation {
    isLongEnough = (name: string) => {
        if (name.length < 3) {
            return false;
        }
        return true;
    }

}
//Phone
interface IPhoneValidation {
    isLongEnough: Function;
    isRightFormat: Function;
}
class PhoneValidator implements IPhoneValidation {
    isLongEnough = (num: string) => {
        if (num.length !== 10)
            return false;
        return true;
    }
    isRightFormat = (num: string) => {
        if (this.isLongEnough(num) === false)
            return false;
        if (num[0] !== '0')
            return false;
        return true;
    }
}

//Customer
interface ICustomerValidation {
    isNameValid: Function,
    isPhoneValid: Function,
    isSpentValid: Function,
    isRankingValid: Function,
}

export class CustomerValidator implements ICustomerValidation {

    nameValidator: NameValidator;
    phoneValidator: PhoneValidator;


    constructor() {
        this.nameValidator = new NameValidator();
        this.phoneValidator = new PhoneValidator();
    }

    isNameValid = (n: string) => {
        return this.nameValidator.isLongEnough(n);
        
    }
    isPhoneValid = (p:string) => {
        return this.phoneValidator.isLongEnough(p) && this.phoneValidator.isRightFormat(p);
    }
    isSpentValid = () => {

    }
    isRankingValid = () => {

    }




}