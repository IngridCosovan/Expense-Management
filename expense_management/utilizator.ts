class Utilizator {
    id: number;
    nume: string;
    sursaDeVenit: SursaDeVenit[] = [];
    categoriiCheltuieli: CategorieCheltuiala[] = [];
    fonduriDeInvestitii: FondurDeInvestitii [] = [];
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
