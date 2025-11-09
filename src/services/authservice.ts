import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";

interface Apiresponse{
    
    accessToken : string,
    refreshToken : string,
    username : string
}
@Injectable({
    providedIn : 'root'
})
export class authService{
    constructor(
        private readonly httpClient : HttpClient
    )
    {}



    currentSubject = new BehaviorSubject<string | null>(null)

    currentuser$ = this.currentSubject.asObservable()

    

    public get currentUserValue() : string | null{
        return this.currentSubject.value
    }

    
    loginUser( username : string , password : string){

        this.httpClient.post<Apiresponse>('http://localhost:3000/auth/login', {username : username , password : password}).pipe(
            tap(response => {
                const username = response.username;
                const accessToken = response.accessToken;

                if (username && accessToken){
                    localStorage.setItem('user' ,username);
                    localStorage.setItem('accessToken' , accessToken)
                    this.currentSubject.next(username);
                }
            })
        )
    }


}