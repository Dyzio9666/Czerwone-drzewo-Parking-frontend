import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn : 'root'
})

export class sendDateInfo{
    currentDateSubject = new BehaviorSubject<string | null>(null);
    currentDateValue$ = this.currentDateSubject.asObservable()
    updateDateInfo(newDate :string){
        console.log(newDate)
        this.currentDateSubject.next(newDate)
    }
}