import { NumberValueAccessor } from "@angular/forms";

export interface Order{
    OrderID: number,
    UserID: number,
    Amount: number,
    Date: Date,
    state: number,
    Descr:string
}