import { Component, OnInit } from '@angular/core';
import { TodoVO } from '../domain/todo.vo';
import { ResultVO } from '../domain/result.vo';
import { UserService } from '../user.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss'],
  animations:[
    trigger('flyInOut',[
      state('in', style({transform:'translate(0,0)'})),
      transition('void => *', [
        style({transform: 'translate(-100%, 0)'}),
        animate(300)
      ]),
      transition('* => void', [
        animate(300,style({transform: 'translate(100%, 0)'}))
      ])
    ])
  ]
})
export class AngularComponent implements OnInit {
  //todo = new TodoVO();
  newTodo = new TodoVO();
  todoList = new Array<TodoVO>();
  tempTodoList:Map<number, TodoVO> = new Map<number, TodoVO>();

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

  modify(item: TodoVO){
    item.isEdited = true;

    let tempTodo = new TodoVO();
    tempTodo.isFinished = item.isFinished;
    tempTodo.todo = item.todo;
    this.tempTodoList.set(item.todo_id, tempTodo);
    console.log(`modify todo : ${item.todo}`);
  }

  remove(item: TodoVO){
    const result = confirm(`${item.todo}(을)를 삭제하시겠습니까?`);
    if(result){
      this.userService.removeTodo(item.todo_id)
      .subscribe((data:ResultVO)=>{
        if(data.result === 0){
          var startNumber = this.todoList.indexOf(item);
          if(startNumber > -1 )this.todoList.splice(startNumber, 1);
          console.log(`remove todo complete : ${item.todo}`);
        }
      });
    }
  }

  save(item: TodoVO){
    this.userService.modifyTodo(item)
    .subscribe((data:TodoVO) => {
      item.isFinished = data.isFinished;
      item.todo = data.todo;
      item.isEdited = false;
      console.log(`save todo complete : ${item.todo}`);
    });
  }

  restore(item: TodoVO){
    item.isEdited = false;

    let tempTodo = this.tempTodoList.get(item.todo_id);
    item.isFinished = tempTodo.isFinished;
    item.todo = tempTodo.todo;
    console.log(`restore todo : ${item.todo}`);
  }
}
