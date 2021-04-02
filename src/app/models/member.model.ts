import { NumberValueAccessor } from "@angular/forms";

export interface Member{
    UserId: number,
    Username: string,
    password: string,
    FullName: string,
    GroubID: number,
    Address: string,
    phone: string,
    seen:number
}