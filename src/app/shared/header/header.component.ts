import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/components/services/account.service';
import { User } from 'src/app/interfaces/user';
@Component({
  selector: 'app-header',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class HeaderComponent implements OnInit {

  user?: User | null;
  success?:boolean



constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);

}

get successGetter(){
  return this.accountService.success
}

logout() {
    this.accountService.logout();
}

compo_Logout(){
  return this.accountService.logout()
}

ngOnInit(): void {
  this.success = this.successGetter
  console.log('this.successGetter: ', this.successGetter );//devuelve true if register is okay
}

}
