import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { User } from '../models/user.model';


const LOCAL_STORAGE_ITEM_NAME = 'users';

@Injectable({
  providedIn: 'root'
})


export class UsersService {



  constructor() {

  }

  save2(user: User): Observable<any> {
    let users: User[];
    this.getAll2().subscribe(
      response => {
        users = response;
      }
    );

    // if id is null user dont exist and a new id is generated but if id not null that user is removed from the array
    if (user.id === null) {
      const newId = this.generateId();
      user.id = newId;

    } else {
      let index = users.findIndex(u => {
        return u.id === user.id;
      });
      users.splice(index, 1);

      console.log(index);
    }
    return new Observable((observer: Observer<any>) => {
      if (users) {
        users.push(user);
        localStorage.setItem('LOCAL_STORAGE_ITEM_NAME', JSON.stringify(users));
        observer.next(user);
        observer.complete();
      }
    }
    );
  }

  delete(user: User): Observable<any> {

    let users: User[];
    let _users: User[] = [];
    this.getAll2().subscribe(
      response => {
        users = response;
      }
    );

    return new Observable((observer: Observer<any>) => {
      try {
        if (users) {
          for (let i = 0; i < users.length; i++) {
            if (users[i].id !== user.id) {
              _users.push(users[i]);
            }
          }
          /*
          let index = users.findIndex(u => {
            return u.id = user.id;
          });
          users.splice(index, 1);
*/
          localStorage.setItem('LOCAL_STORAGE_ITEM_NAME', JSON.stringify(_users));
          observer.next('Deleted');
          observer.complete();
        }
      } catch (error) {
        observer.error(error);
      }

    }
    );

  }



  private initList(): void {
    if (!localStorage.getItem('LOCAL_STORAGE_ITEM_NAME')) {
      // check if list if empty to create it if true
      localStorage.setItem('LOCAL_STORAGE_ITEM_NAME', '');
    }
  }

  getAll2(): Observable<any> {
    this.initList();
    let response: User[];
    const retrievedData = localStorage.getItem('LOCAL_STORAGE_ITEM_NAME');
    if (retrievedData) {
      response = JSON.parse(retrievedData);
    } else {
      response = [];
    }
    return new Observable((observer: Observer<any>) => {
      observer.next(response);
      if (response.length === 0) {
        observer.error("user list didnt existed in local storage");
      }
    });

  }

  clearList(): void {
    localStorage.removeItem('LOCAL_STORAGE_ITEM_NAME');

  }

  private generateId(): number {
    let users: User[];
    this.getAll2().subscribe(
      response => {
        users = response;
      }
    );
    if (users.length === 0) {
      return 1;
    } else {
      try {
        const ids = users.map(user => user.id);
        return Math.max(...ids) + 1;
      } catch (e) {
        console.log(e);
        return null;
      }

    }


  }



}
