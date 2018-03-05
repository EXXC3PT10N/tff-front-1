import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserP2 } from '../userP2';
import { AuthService } from '../auth.service';

@Component({
  
  templateUrl: './register-part-two.component.html',
  styleUrls: ['./register-part-two.component.css']
})
export class RegisterPartTwoComponent implements OnInit {

  first_name: string;
  last_name: string;
  phone: string;
  city: string;
  typ: number;
  user: UserP2;

  constructor(private _route: ActivatedRoute, private _authService: AuthService) { }

  ngOnInit() {
    this.typ = +this._route.snapshot.paramMap.get('type');
  }

  sendToF(): void{
    
      this.user = {
        first_name: this.first_name,
        last_name: this.last_name,
        phone: this.phone,
        city: this.city
      };
      this._authService.registerP2(this.user,this.typ).subscribe(
        user => this.user = user
      );
        
      //this._router.navigate(['/registerP2']);
      
    }
     
  }

