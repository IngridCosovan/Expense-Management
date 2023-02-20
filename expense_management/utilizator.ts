class Utilizator {
    userName: string;
    email: string;
    parola: string;
    sursaDeVenit?: SursaDeVenit[] = [];
    categoriiCheltuieli?: CategorieCheltuiala[] = [];
    fonduriDeInvestitii?: FondurDeInvestitii [] = [];
}

class SursaDeVenit {
    nume: string;
    valoare: number;
}

class CategorieCheltuiala {
    nume: string;
    cheluieli: Cheltuiala[] = [];
}

class Cheltuiala {
    data: number;
    descriere: string;
    valoare: number;
}

class FondurDeInvestitii {
    nume: string;
    valoareInvestitie: number;
    procentCresterePierdere: number;
    valoareCarstigatăPierdută: number;
}

class Controller {
    service: Service;
    
    constructor(service: Service){
        this.service = service;
    }
    
    creareContUtilizator(){
        const prompt = require('prompt-sync')();
        let userName = prompt('Write your username');
        let email = prompt('Write your email');
        let password = prompt('Write your password');
        let utilizator = new Utilizator();
        utilizator.userName = userName;
        utilizator.email = email;
        utilizator.parola = password;
        try{
            this.service.creareCont(utilizator);
        }catch (e) {
            console.log('Cont inalid');
        }

    }
}



class Service {
    private utilizatorRepo: RepoUtilizator;
    private validator: Validator;

    constructor(utilizatorRepo: RepoUtilizator, validator: Validator) {
        this.utilizatorRepo = utilizatorRepo;
        this.validator = validator;
    }

    creareCont(utilizator: Utilizator): void {
        if (!this.validator.verificareEmailValid(utilizator.email) && this.validator.verificareParola(utilizator.parola)) {
            this.utilizatorRepo.utilizatori.push()
        } else {
            if (this.validator.verificareEmailValid(utilizator.email)) {
                throw new InvalidMail('Nu ati scris un mail valid!');
            }
            if (this.validator.verificareParola(utilizator.parola)) {
                throw new InvalidPassword('Parola nu indeplineste cerintele!');
            }
        }
    }


}

class Validator {
    private utilizatorRepo: RepoUtilizator;

    constructor(utilizatorRepo: RepoUtilizator) {
        this.utilizatorRepo = utilizatorRepo;
    }

    verificareEmailValid(email: string) {
        const mail: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (mail.test(email) === true) {
            return true;
        }
        return false;
    }


    verificareParola(parola: string) {
        const password: RegExp = /^(?!.*(\w)\1{3,}).(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
        if (password.test(parola) === true) {
            return true;
        }
        return false;
    }
}

//(?!.*(\w)\1{3,}) asta nu ma lasa 3 litere la fel una dupa alta

interface utilizatorRepo {
    save(user: object): Utilizator;
}


class RepoUtilizator {
    public utilizatori: Utilizator[] = [];
    
    save(utilizator: Utilizator): Utilizator{
        this.utilizatori.push(utilizator);
        return utilizator;
    }
}

class InvalidMail extends Error {
    constructor(msg: string) {
        super(msg);
    }
}

class InvalidPassword extends Error {
    constructor(msg: string) {
        super(msg);
    }
}
