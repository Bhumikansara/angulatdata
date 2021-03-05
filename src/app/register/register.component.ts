import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
	registerForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
	invalidRegister: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            company: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
		//this.router.navigate(['/plan']);
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
		
		//this.router.navigate(['/plan']); 
        this.loading = true;
        this.authenticationService.register(this.f.firstname.value,this.f.lastname.value,this.f.email.value, this.f.password.value, this.f.company.value)
		.subscribe(result => {   
			if(result.message == 'This E-mail already in use!'){
				alert(result.message);
				return this.registerForm.invalid;
			}else if (result.success == true) {
				this.router.navigate(['/plan']);
				//this.invalidRegister = false; 
			  //let data_name = JSON.parse(sessionStorage.getItem("currentUser"));
			  //alert(JSON.parse(sessionStorage.getItem("currentUser")));
			  //return false;
			  //let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');  
			  //this.router.navigate(['/']);    				
			} 
			else    
			  this.invalidRegister = true;   
		  });  
		
	}

}
