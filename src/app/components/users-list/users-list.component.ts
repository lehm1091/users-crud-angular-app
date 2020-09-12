import { Component, OnInit } from "@angular/core";
import { User } from "../../models/user.model";
import { UsersService } from "../../services//users.service";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.css"]
})
export class UsersListComponent implements OnInit {
  title = "Lista de Usuarios";
  leftTittle = "Nuevo Usuario";
  usersList: User[];
  user: User = new User();
  formSubmited = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.generateRamdomUser();
    this.getUsers();
  }

  generateRamdomUser() {
    let number = this.ramdomNumber()+this.ramdomNumber()*this.ramdomNumber();
    this.user = {
      id: null,
      name: `Aleatorio${number}`,
      email: `aleatorio${number}@email`
    };
  }

  private ramdomNumber() {
    return (
      Math.floor(Math.random() * 10) + 1 * Math.floor(Math.random() * 10) + 1
    );
  }

  saveUser() {
    this.usersService.save2(this.user).subscribe(response => {
      console.log(response);
    });

    this.generateRamdomUser();
    this.getUsers();
    this.leftTittle = "Nuevo Usuario";
    this.formSubmited = false;
  }

  setUserToEdit(user: User) {
    this.leftTittle = "Editar Usuario";
    // en this.user se guarda nada mas la referencia
    this.user = user;
    // en this.user ahora se guarda un clon de user.
    this.user = JSON.parse(JSON.stringify(user));
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

  setFormSubmited(sumited) {
    this.formSubmited = true;
  }
}
