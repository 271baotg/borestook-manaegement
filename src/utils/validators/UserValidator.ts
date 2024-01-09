import { CustomerModel } from "../../models/CustomerModel";
import UserModel from "../../models/UserModel";

const isContaineSpecialCharacter = (p: string) => {
    if (p) {
        const regex = /[^a-zA-Z0-9]/;
        if (regex.test(p)) {
            return true;
        }
    }
    return false;
};

//Validation
interface IValidation {
    isValid: Function
}

//Password
interface IPasswordValidation extends IValidation {
    isLongEnough: Function
    isContaineSpecialCharacter: Function
    isContainerNumber: Function;
}

class PasswordValidator implements IPasswordValidation {
    isLongEnough = (p: string) => {
        if (p && p.length && p.length >= 8) {
            return true;
        }
        return false;
    }
    isContainerNumber = (p: string) => {
        if (p) {
            const regex = /\d+/;
            if (regex.test(p)) {
                return true;
            }
        }
        return false;

    };
    isContaineSpecialCharacter = (p: string) => {
        return isContaineSpecialCharacter(p);
    };

    isValid = (p: string) => {
        if (this.isLongEnough(p) && this.isContaineSpecialCharacter(p) && this.isContainerNumber(p)) {
            return true;
        }
        return false;
    }
}

//Username
interface IUserNameValidation extends IValidation {
    isLongEnough: Function;
    notContainSpecialChar: Function;
}
class UserNameValidator implements IUserNameValidation {
    isLongEnough = (u: string) => {
        if (u.length < 8)
            return false;
        return true;
    }
    notContainSpecialChar = (u: string) => {
        if (u === '') return false;
        return !isContaineSpecialCharacter(u);
    }
    isValid = (u: string) => {
        return this.isLongEnough(u) && this.notContainSpecialChar(u);
    }
}
// Full name
interface INameValidation extends IValidation {
    isLongEnough: Function;
}
class NameValidator implements INameValidation {
    isValid = (n: string) => {
        return (this.isLongEnough(n));
    }
    isLongEnough = (n: string) => {
        if (n.length < 3)
            return false;
        return true;
    }

}
//Email
interface IEmailValidation extends IValidation {
    isRightFormat: Function;
}
class EmailValidator implements IEmailValidation {
    isValid = () => {

    }
    isRightFormat = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }
}

export class UserValidator implements IValidation {
    userNameValidator: UserNameValidator;
    passwordValidator: PasswordValidator;
    nameValidator: NameValidator;
    emailValidator: EmailValidator;
    isValid = (user: UserModel) => {
        return this.nameValidator.isValid(user.fullName ?? '')
            && this.passwordValidator.isValid(user.password)
            && this.userNameValidator.isValid(user.username)
    }
    constructor() {
        this.userNameValidator = new UserNameValidator();
        this.passwordValidator = new PasswordValidator();
        this.nameValidator = new NameValidator();
        this.emailValidator = new EmailValidator();
    }
}