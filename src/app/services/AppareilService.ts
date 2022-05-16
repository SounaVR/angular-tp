import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class AppareilService {
    private appareils : any[] = [];
    appareilsSubject = new Subject<any[]>();

    constructor(private httpClient: HttpClient) { }

    getAllAppareil(): any[] {
        return this.appareils;
    }

    switchOnAll() {
        for(let appareil of this.appareils) {
            appareil.status = 'allumé';
            this.emitAppareilSubject();
        }
    }
    
    switchOffAll() {
        for (let appareil of this.appareils) {
            appareil.status = 'éteint';
            this.emitAppareilSubject();
        }
    }

    switchOnOne(i: number) {
        this.appareils[i].status = 'allumé';
        this.emitAppareilSubject();
    }

    switchOffOne(i: number) {
        this.appareils[i].status = 'éteint';
        this.emitAppareilSubject();
    }

    getAppareilById(id: number) {
        const appareil = this.appareils.find(
            (s) => {
                return s.id === id;
            }
        );
        return appareil;
    }

    emitAppareilSubject() {
        this.appareilsSubject.next(this.appareils.slice());
    }
    
    addAppareil(name: string, status: string) {
        const appareilObject = {
            id: 0,
            name: '',
            status: ''
        };
        appareilObject.name = name;
        appareilObject.status = status;
        if (this.appareils.length != 0) {
            appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
        } else {
            appareilObject.id = 0;
        }        
        this.appareils.push(appareilObject);
        this.emitAppareilSubject();
    }

    saveAppareilsToServer() {
        this.httpClient
            .put('https://angular-tp-5eb33-default-rtdb.europe-west1.firebasedatabase.app/appareil.json', this.appareils)
            .subscribe({
                next: () => console.log('Enregistrement terminé !'),
                error: (error) => console.log('Erreur ! : ' + error),
                complete: () => console.info('Observable complete!') 
            })
    }

    getAppareilsFromServer() {
        this.httpClient
            .get<any[]>('https://angular-tp-5eb33-default-rtdb.europe-west1.firebasedatabase.app/appareil.json')
            .subscribe({
                next: (response) => {
                this.appareils = response;
                this.emitAppareilSubject();
                },
                error: (error) => console.log('Erreur ! : ' + error),
                complete: () => console.info('Observable complete!') 
            })
    }
}