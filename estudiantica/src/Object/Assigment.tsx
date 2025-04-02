export class Assigment {
    id: number;
    class_name : string;  
    due_date : string;
    notes : string;
    grade : number;
    name : string;
    optional : boolean = false;
    progress : number;
    tag : string;

    constructor(AssigmentObj : {id: number, class_name: string,
        due_date : string, notes : string, grade : number, name : string, optional : boolean, progress : number, tag : string}
    ) {
        this.id = AssigmentObj.id;
        this.class_name = AssigmentObj.class_name;
        this.due_date = AssigmentObj.due_date;
        this.notes = AssigmentObj.notes;
        this.grade = AssigmentObj.grade;
        this.name = AssigmentObj.name;
        this.optional = AssigmentObj.optional;
        this.progress = AssigmentObj.progress;
        this.tag = AssigmentObj.tag
    }
}
