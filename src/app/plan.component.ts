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
	loading = false;
	invalidLogin: boolean; 
	//private records = Array<object> = [];

    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
		private userService: UserService) {	}
	
	ngOnInit() {
		 return this.userService.getAllplan().subscribe((data: {}) => {
		  this.plans = data;
		})
		
		
		this.loadStripe();
		

        
    }
	
    // convenience getter for easy access to form fields		
	
	/* showContent(data:any,price:any){

        this.loading = true;
        this.authenticationService.company(data,price)
		.subscribe(result => { 
			if (result.data == true) {
				alert(result.price);
				return false;
			  //let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');  
			  this.router.navigate(['/payment-components']);  
			}  
			else
			  ///alert("false");			
			  this.invalidLogin = true;   
		  });  

		

	} */
	
	
	pay(data:any,amount:any){    
	 this.loading = true;
        this.authenticationService.company(data,amount)
		.subscribe(result => { 
			var handler = (<any>window).StripeCheckout.configure({
			  key: 'pk_test_51IScgCD2lS3OX6ujsCPc3nlfNlWOXG7huWWy8OhR4XRQXAmCeYRUdym3avMKmZSlqsJYZw5ambjxUlv4tarzrAgL00sAtaOlH7',
			  locale: 'auto',
			  token: function (token: any) {
				// You can access the token ID with `token.id`.
				// Get the token ID to your server-side code for use.
				console.log(token)
				//alert('Token Created!!');
				//let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');  
				this.router.navigate(['/payment-components']);
			  }
			});
		 
			handler.open({
			  name: 'Strip Payments',
			  description: '',
			  amount: amount * 100
			});
		});
  }
 
  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        var handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51IScgCD2lS3OX6ujsCPc3nlfNlWOXG7huWWy8OhR4XRQXAmCeYRUdym3avMKmZSlqsJYZw5ambjxUlv4tarzrAgL00sAtaOlH7',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
       
      window.document.body.appendChild(s);
    }
  }

	 

}


