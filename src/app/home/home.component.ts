import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent{
    	
	loading = false;
    users: any = [];
	//private records = Array<object> = [];

    constructor(private userService: UserService) { }

    ngOnInit() {
		 this.getData();        
	}
	
	public getData() {
		/* this.userService.getAll().subscribe((data: any) => {
			this.users = data;
			 var log = [];
			for (var i = 0; i < this.users.length; i++) { 
					//console.log(this.users[i].id);
                    log = this.users[i].id;
					log = this.users[i].email;
					log = this.users[i].name;
                }   
			
		}); */
		 return this.userService.getAll().subscribe((data: {}) => {
		  this.users = data;
		})
	}
	
}