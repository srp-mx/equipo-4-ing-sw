export class ItemEquiped { 
    weapon: Weapon;
    armor: Armor;
    pet: Pet; 
    constructor(ItemEquipedObj : { weapon:Weapon, armor:Armor, pet:Pet}){
        this.weapon = ItemEquipedObj.weapon;
        this.pet = ItemEquipedObj.pet;
        this.armor = ItemEquipedObj.armor;
    }
}

export class Armor {
    id: number;
    created_at: string; 
    name: string;
    rarity: number; 
    description: string; 
    image_uri: string; 
    strength: number; 
    defense: number; 
    intelligence: number; 
    heart: number; 
    damage_received: number;
    worn_since: string;
    constructor(WeaponObj : { id:number, created_at:string, name:string, rarity:number, description:string, 
        image_uri:string, strength:number, defense:number, intelligence:number, heart:number, damage_received:number, worn_since:string
    }){
        this.id = WeaponObj.id;
        this.created_at = WeaponObj.created_at;
        this.name = WeaponObj.name;
        this.rarity = WeaponObj.rarity;
        this.description = WeaponObj.description;
        this.image_uri = WeaponObj.image_uri;
        this.strength = WeaponObj.strength; 
        this.defense = WeaponObj.defense;
        this.intelligence = WeaponObj.intelligence;
        this.heart = WeaponObj.heart;
        this.damage_received =  WeaponObj.damage_received;
        this.worn_since = WeaponObj.worn_since;
    }
}

export class Weapon {
    id:number; 
    created_at:string;
    name:string; 
    rarity:number; 
    description:string; 
    image_uri: string; 
    strength:number; 
    defense:number; 
    intelligence:number; 
    heart:number; 
    slay_count:number; 
    equipped_since:string;
    constructor( ArmorObj: {id:number, created_at:string, name:string, rarity:number, description:string,
        image_uri:string, strength: number, defense:number, intelligence:number, heart:number, slay_count: number, equipped_since:string
    }){
        this.id = ArmorObj.id; 
        this.created_at = ArmorObj.created_at;
        this.name = ArmorObj.name;
        this.rarity = ArmorObj.rarity; 
        this.description = ArmorObj.description; 
        this.image_uri = ArmorObj.image_uri;
        this.strength = ArmorObj.strength;
        this.defense = ArmorObj.defense;
        this.intelligence = ArmorObj.intelligence;
        this.heart = ArmorObj.heart; 
        this.slay_count = ArmorObj.slay_count;
        this.equipped_since = ArmorObj.equipped_since
    }
}

export class Pet {
    id: number; 
    created_at: string; 
    name: string; 
    rarity: number;
    description: string; 
    image_uri: string; 
    strength: number; 
    defense: number; 
    intelligence: number; 
    heart: number; 
    bond: number; 
    accompanying_since: string;
    constructor( PetObj: {id:number, created_at:string, name:string, rarity:number, description:string, 
        image_uri:string, strength: number, defense:number, intelligence:number, heart:number, bond:number, accompanying_since:string
    }){
        this.id = PetObj.id; 
        this.created_at = PetObj.created_at;
        this.name = PetObj.name; 
        this.rarity = PetObj.rarity; 
        this.description = PetObj.description;
        this.image_uri = PetObj.image_uri; 
        this.strength = PetObj.strength; 
        this.defense = PetObj.defense; 
        this.intelligence = PetObj.intelligence; 
        this.heart = PetObj.heart; 
        this.bond = PetObj.bond; 
        this.accompanying_since = PetObj.accompanying_since; 
    }
}