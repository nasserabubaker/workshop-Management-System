import { NumberValueAccessor } from "@angular/forms";

export interface Item{
    ID: number,
    Name: string,
    categorie_id: number,
    Pic: string,
    Price: number,
    State: number,
    NumberOfItems: number,
    descr: string,
    visible: number,
    color_count: number,
    colors: string,
}