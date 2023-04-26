export class errorToApiErrorMessage extends Error {

    constructor(message: string, name: "Erorr obrakowy nie ma i chuj", code: 202) {
        super(message);
        this.name = name;
        this.code = code;
    }

    message: "WYjebało błąd";
    name: "Erorr obrakowy nie ma i chuj";
    code: 202;

}