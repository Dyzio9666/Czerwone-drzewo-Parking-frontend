import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface reservation{
    id : number;
    made_by : string;
    date : string;  
    placeChoosen : number;
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
        // let reservation = null;
          return this.httpClient.get<reservation[]>('http://localhost:3000/admin/reservations');
    }
    deleteReservation(reservationID : number){
        return this.httpClient.delete('http://localhost:3000/admin/delete-reservation' , {body : {id : reservationID}});
    }
}