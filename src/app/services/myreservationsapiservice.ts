import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { place } from "../components/my-reservations/my-reservations";


@Injectable({
    providedIn : 'root'
})
export class myReservationService{
    constructor(
        private readonly httpClient : HttpClient
    ){

    }
    private userJWT = localStorage.getItem('accessToken') || '' ; 
    header = new HttpHeaders().set('Authorization' , `Bearer ${this.userJWT}`);

    deleteReservation(id : number){
        return this.httpClient.delete('http://localhost:3000/reservation/delete-reservaiton', {body : {id : id}, headers  : this.header});
    }
    getMyReservations(username : string){
       return this.httpClient.get<place[]>(`http://localhost:3000/reservation/my-places?username=${username}`, {headers : this.header});

    }
}