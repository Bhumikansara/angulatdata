import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
		//if(this.isLoggedIn == false)
			//return this.http.get<User[]>(`${environment.apiUrl}/user-info.php`);
		//else
			//return this.http.post<User[]>(`${environment.apiUrl}/info.php`);
			
		return this.http.get(`${environment.apiUrl}/info.php`)
		

    }
	
	getAllplan() {
		//if(this.isLoggedIn == false)
			//return this.http.get<User[]>(`${environment.apiUrl}/user-info.php`);
		//else
			//return this.http.post<User[]>(`${environment.apiUrl}/info.php`);
			
		return this.http.get(`${environment.apiUrl}/plan.php`)
		

    }
	

	
	
	public isLoggedIn(): boolean {      
	   let status = false;      
	   if (localStorage.getItem('isLoggedIn') == "true") {      
		  status = true;      
	   }    
	   else {      
		  status = false;      
		  }      
	   return status;      
	   }    
    
}