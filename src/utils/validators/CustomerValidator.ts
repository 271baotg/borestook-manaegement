import { CustomerModel } from "../../models/CustomerModel";

interface IValidation {
    isValid: Function;
}

//Name 
interface INameValidation  extends IValidation{
    isLongEnough: Function;
}

class NameValidator implements INameValidation {
    isValid = (n:string) => {
        return this.isLongEnough(n);
    }
    isLongEnough = (name: string) => {
        if (name.length < 3) {
            return false;
        }
        return true;
    }

}
//Phone
interface IPhoneValidation extends IValidation{
    isLongEnough: Function;
    isRightFormat: Function;
}
class PhoneValidator implements IPhoneValidation {
    isValid = (n:string) => {
        return this.isLongEnough(n) && this.isRightFormat(n);
    }
    isLongEnough = (num: string) => {
        if (num.length > 9)
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
interface ICustomerValidation extends IValidation{
    isNameValid: Function,
    isPhoneValid: Function,
    isSpentValid: Function,
    isRankingValid: Function,
}

export class CustomerValidator implements ICustomerValidation {
    
    nameValidator: NameValidator;
    phoneValidator: PhoneValidator;
    isValid = (cus:CustomerModel) => {
        return this.nameValidator.isValid(cus.fullName ?? '') && this.phoneValidator.isValid(cus.phoneNumber ?? '');
    }


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