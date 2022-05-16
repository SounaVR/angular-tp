import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';

@Injectable()
export class AuthService {
    isAuth = false;

    createNewUser(email: string, password: string) {
        return new Promise<void>(
            (resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(
                () => {
                resolve();
                },
                (error) => {
                reject(error);
                }
            );
            }
        );
    }

    signInUser(email: string, password: string) {
        return new Promise<void>(
            (resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password).then(
                () => {
                resolve();
                },
                (error) => {
                reject(error);
                }
            );
            }
        );
    }

    signOutUser() {
        firebase.auth().signOut();
    }    
}
