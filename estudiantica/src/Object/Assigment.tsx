export class Assigment {
    id: number;
    className : string  
    dueDate : Date = new Date();
    notes : string;
    grade : number;
    name : string;
    optional : boolean = false;
    progress : number;
    tag : string;

    constructor(AssigmentObj : {id: number, className: string,
        dueDate : Date, notes : string, grade : number, name : string, optional : boolean, progress : number, tag : string}
    ) {
        this.id = AssigmentObj.id;
        this.className = AssigmentObj.className;
        this.dueDate = AssigmentObj.dueDate;
        this.notes = AssigmentObj.notes;
        this.grade = AssigmentObj.grade;
        this.name = AssigmentObj.name;
        this.optional = AssigmentObj.optional;
        this.progress = AssigmentObj.progress;
        this.tag = AssigmentObj.tag
    }
}
