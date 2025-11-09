import { JsonPipe } from "@angular/common";
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
    register (username : string , password : string){
        this.httpClient.post('http://localhost:3000/auth/signin', {username : username , password : password}).subscribe({
            next : (response =>{
                console.log(response);
            })
        })
    }
    
    loginUser( username : string , password : string){
        console.log('test')
        this.httpClient.post<Apiresponse>('http://localhost:3000/auth/login', {username : username , password : password}).pipe(
            tap(response => {
                // console.log(response)
                const username = response.username;
                const accessToken = response.accessToken;

                if (username && accessToken){
                    localStorage.setItem('user' ,username);
                    localStorage.setItem('accessToken' , accessToken)
                    this.currentSubject.next(username);
                }
            })
        ).subscribe()
    }

    logout(){
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        this.currentSubject.next(null);
    }
    private loadInitailUser(){
        const token = localStorage.getItem('accessToken');
        const userjson = localStorage.getItem('user') as string
        if(userjson && token){
            try{
                const user   = JSON.parse(userjson)  ;
                this.currentSubject.next(user)
            }
            catch(e)
            {
                this.logout()
            }
        }
    }


}