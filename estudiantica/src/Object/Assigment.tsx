export class Assigment {
    id: number;
    class_id : number;  
    due_date : string;
    notes : string;
    grade : number;
    name : string;
    optional : boolean = false;
    progress : number;
    tag : string;

    constructor(AssigmentObj : {id: number, class_id: number,
        due_date : string, notes : string, grade : number, name : string, optional : boolean, progress : number, tag : string}
    ) {
        this.id = AssigmentObj.id;
        this.class_id = AssigmentObj.class_id;
        this.due_date = AssigmentObj.due_date;
        this.notes = AssigmentObj.notes;
        this.grade = AssigmentObj.grade;
        this.name = AssigmentObj.name;
        this.optional = AssigmentObj.optional;
        this.progress = AssigmentObj.progress;
        this.tag = AssigmentObj.tag
    }
}
