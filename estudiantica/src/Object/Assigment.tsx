export class Assigment {
    id: number;
    class : {
        classId : number,
        className : string,
        classColor : string
    };
    dueDate : Date = new Date();
    notes : string;
    grade : number;
    name : string;
    optional : boolean = false;
    progress : number;
    tag : string;

    constructor(AssigmentObj : {id: number, classObj: { classId: number; className: string; classColor: string },
        dueDate : Date, notes : string, grade : number, name : string, optional : boolean, progress : number, tag : string}
    ) {
        this.id = AssigmentObj.id;
        this.class = AssigmentObj.classObj;
        this.dueDate = AssigmentObj.dueDate;
        this.notes = AssigmentObj.notes;
        this.grade = AssigmentObj.grade;
        this.name = AssigmentObj.name;
        this.optional = AssigmentObj.optional;
        this.progress = AssigmentObj.progress;
        this.tag = AssigmentObj.tag
    }
}
