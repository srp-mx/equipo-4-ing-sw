export class Class {
    id : number;
    name : string;
    startDate : Date;
    endDate : Date;
    gradeFormula : string;

    constructor(classObj : {
        id : number,
        name : string,
        startDate : Date,
        endDate : Date,
        gradeFormula : string
    }){
        this.id = classObj.id;
        this.name = classObj.name;
        this.startDate = classObj.startDate;
        this.endDate = classObj.endDate;
        this.gradeFormula = classObj.gradeFormula
    }
}