import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface reservation{
    id : number;
    made_by : string;
    date : string;  
    placeNumber : number;
}
@Injectable({
    providedIn : 'root'
})
export class adminApiService {
    constructor(
        private readonly httpClient : HttpClient
    ){

    }
    reservations : reservation[] = [];
    getAllReservations(){
         this.httpClient.get<reservation[]>('http://localhost:3000/admin/reservations').subscribe(
            response =>{
                this.reservations = response;
                console.log(this.reservations)
            }
        )
        return this.reservations;   
    }
}