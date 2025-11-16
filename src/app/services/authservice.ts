import { JsonPipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, firstValueFrom, tap } from "rxjs";

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
    
async loginUser(username: string, password: string): Promise<boolean> {
  try {
    // 1. firstValueFrom zamienia Observable na Promise
    // 2. await sprawia, że kod CZEKA tutaj na odpowiedź serwera
    await firstValueFrom(
      this.httpClient.post<Apiresponse>('http://localhost:3000/auth/login', { username, password }).pipe(
        tap(response => {
          // Ten kod wykona się, jeśli zapytanie się uda
          const username = response.username;
          const accessToken = response.accessToken;

          if (username && accessToken) {
            localStorage.setItem('user', username);
            localStorage.setItem('accessToken', accessToken);
            this.currentSubject.next(username);
          }
        })
      )
    );

    // Jeśli linia wyżej nie rzuciła błędu (nie weszła do catch), to znaczy że jest SUKCES
    return true;

  } catch (error) {
    // Jeśli serwer zwróci błąd (np. 401), await rzuci wyjątek i trafimy tutaj
    console.error("Błąd logowania:", error);
    return false;
  }
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