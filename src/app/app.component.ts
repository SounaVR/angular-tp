import { Component } from '@angular/core';
import { interval, Subscription} from 'rxjs';
import { AuthService } from './services/AuthService';
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBBjh6yfBoTrGaPtJTsfeMH65TKiv4g2HY",
  authDomain: "angular-tp-5eb33.firebaseapp.com",
  databaseURL: "https://angular-tp-5eb33-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "angular-tp-5eb33",
  storageBucket: "angular-tp-5eb33.appspot.com",
  messagingSenderId: "296628017787",
  appId: "1:296628017787:web:3273c5c6207a796ddf20de"
};

firebase.initializeApp(firebaseConfig);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  secondes!: number;
  counterSubscription!: Subscription;
  isAuth!: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const counter = interval(1000);

    this.counterSubscription = counter.subscribe({
      next: (value) => this.secondes = value,
      error: (error) => console.log('Uh-oh, an error occurred! : ' + error),
      complete: () => console.info('Observable complete!') 
    });

    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );  
  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }

  onSignOut() {
    this.authService.signOutUser();
  }    
}
