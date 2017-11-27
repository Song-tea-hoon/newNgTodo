import { Component, OnInit } from '@angular/core';
import { TodoVO } from '../domain/todo.vo';
import { UserService } from '../user.service';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss']
})
export class AngularComponent implements OnInit {
  //todo = new TodoVO();
  newTodo = new TodoVO();
  todoList = new Array<TodoVO>();

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getTodoList();
  }

  add_todo(){
    this.userService.addTodo(this.newTodo)
    .then((data: TodoVO)=>{
      console.log("add todo complete : " , data);
      this.todoList.unshift(data);
      this.newTodo.todo = null;
      //or
      // this.newTodo = new TodoVO();
    })
  }

  getTodoList() {
    this.userService.getTodoList()
    .then((data: Array<TodoVO>) => {
      console.log(data);
      this.todoList = data;
    })
  }

  updateItem(item: TodoVO){
    //console.log(item);
    item.isFinished = !item.isFinished;
  }
}
