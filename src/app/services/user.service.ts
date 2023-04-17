import { Injectable,EventEmitter } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { LogIn, SignUp } from '../data-type';
import { BehaviorSubject} from 'rxjs';
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isLogInError = new EventEmitter<boolean>(false);

  constructor(private http:HttpClient, private router:Router) { }
  userSignUp(data:SignUp){
    console.log(data)
    return this.http.post("http://localhost:3000/users",data,{observe:'response'}).subscribe((result)=>{
      this.isUserLoggedIn.next(true);
      localStorage.setItem('user',JSON.stringify(result.body))
      this.router.navigate(['/profilepage']) 
    }); 
  }  
  
  reloadUser(){
    if(localStorage.getItem('user')){
      this.isUserLoggedIn.next(true);
      this.router.navigate(['/profilepage']) 
    }
  }

  userLogIn(data:LogIn){
    console.warn(data);
    return this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result:any)=>{
      console.warn(result);
      if(result && result.body && result.body.length){
        console.warn("user logged In"); 
        localStorage.setItem('user',JSON.stringify(result.body))
        this.router.navigate(['/profilepage']) 
      }else{ 
        alert("401 Unauthorized")
        this.isLogInError.emit(true);
      }
    }); 
  }
}
 