import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule  } from '@angular/forms';

import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.less']
})
export class PlanComponent implements OnInit {
	planForm: FormGroup;
    isSubmitted = false;
	radioSelected:any;
    plans: any = [];
	showcontent:boolean=false;

	//private records = Array<object> = [];

    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
		private userService: UserService) { }
	
	ngOnInit() {
		 return this.userService.getAllplan().subscribe((data: {}) => {
		  this.plans = data;
		})
		
		/* this.planForm = new FormGroup({
		  'subscribe-user': ['',Validators.required]
		}) */

        
    }
	
    // convenience getter for easy access to form fields		
	
	onSubmit(data:any){
		//alert(this.selectedItem);
		//this.showcontent=this.radioSelected;
		console.log("planSubmit");
		return false;
		
	}
	
	showContent(data:any){
		console.log(data);
	this.showcontent=this.radioSelected;
	}

}


