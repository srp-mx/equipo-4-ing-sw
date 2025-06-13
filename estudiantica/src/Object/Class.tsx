export class Class {
    id : number;
    name : string;
    start_date : string;
    end_date : string;
    grade_formula : string;
    color? : string;

    constructor(classObj : {
        id : number,
        name : string,
        start_date : string,
        end_date : string,
        grade_formula : string,
        color?: string,
    }){
        this.id = classObj.id;
        this.name = classObj.name;
        this.start_date = classObj.start_date;
        this.end_date = classObj.end_date;
        this.grade_formula = classObj.grade_formula
    }
}