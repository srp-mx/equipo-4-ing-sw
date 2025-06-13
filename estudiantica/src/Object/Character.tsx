export class DataCharacter {
    id: number; 
    user_username: string; 
    name: string; 
    moment_of_last_action: string; 
    streak: number; 
    hp: number;

    constructor(DataCharacterObj : {id:number, user_username: string, 
        name: string, moment_of_last_action: string, streak: number, hp: number
    }){
        this.id = DataCharacterObj.id; 
        this.user_username = DataCharacterObj.user_username;
        this.name = DataCharacterObj.name; 
        this.moment_of_last_action =  DataCharacterObj.moment_of_last_action;
        this.streak = DataCharacterObj.streak; 
        this.hp = DataCharacterObj.hp;
    }
}

export class Skills {
    strength: number; 
    defense: number; 
    intelligence: number; 
    heart: number;
    constructor(SkillsObj : {strength: number, defense: number, intelligence:number, heart : number })
    {
        this.strength = SkillsObj.strength;
        this.defense = SkillsObj.defense; 
        this.intelligence = SkillsObj.intelligence; 
        this.heart = SkillsObj.heart;
    }
}

export class StatsCharacter {
    skills: Skills; 
    streak_bonus_percent: number; 
    xp: number;
    level: number; 
    level_percent: number; 
    xp_to_next_level: number; 
    constructor ( StatsCharacterObj : {skills: Skills, streak_bonus_percent: number, xp:number, 
        level:number, level_percent:number, xp_to_next_level: number
    }){
        this.skills = StatsCharacterObj.skills; 
        this.streak_bonus_percent = StatsCharacterObj.streak_bonus_percent; 
        this.xp = StatsCharacterObj.xp;
        this.level = StatsCharacterObj.level;
        this.level_percent = StatsCharacterObj.level_percent;
        this.xp_to_next_level =  StatsCharacterObj.xp_to_next_level;
    }
}

export class Timers {
    streak_loss: number;
    deletion: number; 
    next_heal: number;
    constructor(TimersObj : {streak_loss : number, deletion: number, next_heal: number})
    {
        this.streak_loss = TimersObj.streak_loss;
        this.deletion = TimersObj.deletion;
        this.next_heal = TimersObj.next_heal;

    }
}

export class RachaCharacter{
    alive: boolean;
    next_check: number;
    timers: Timers; 
    constructor(RachaCHaracterObj : {alive:boolean, next_check:number, timers: Timers}){
        this.alive = RachaCHaracterObj.alive;
        this.next_check = RachaCHaracterObj.next_check;
        this.timers = RachaCHaracterObj.timers;
    }

}