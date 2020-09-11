import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UsersService } from '../../services//users.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  title = "Lista de Usuarios";
  leftTittle = "Nuevo Usuario"
  usersList: User[];
  user: User;


  constructor(private usersService: UsersService) { }

  ngOnInit(): void {

    let number = this.ramdomNumber();
    this.user = { id: null, name: `Nombre Aleatorio${number}`, email: `Nombre_Aleatorio_${number}@correo` };


    this.getUsers();



  }

  private ramdomNumber() {
    return Math.floor(Math.random() * 10) + 1 * Math.floor(Math.random() * 10) + 1;
  }


  saveUser() {


    this.usersService.save2(this.user).subscribe(
      response => {
        console.log(response);
      }
    );
    let number = this.ramdomNumber();
    this.user = { id: null, name: `Nombre Aleatorio${number}`, email: `Nombre_Aleatorio_${number}@correo` };

    this.getUsers();

    this.leftTittle = "Nuevo Usuario";



  }

  editUser(user: User) {
    this.leftTittle = "Editar Usuario";
    this.user = user;



  }

  getUsers() {
    this.usersService.getAll2().subscribe(
      response => {

        this.usersList = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteUser(user: User) {
    this.usersService.delete(user).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
    this.getUsers();
  }

  deleteAll() {

    this.usersService.deleteAll();
    this.getUsers();
  }

}




