import { Component, OnInit } from '@angular/core';
import { GoalDataService } from '../service/data/goal-data.service';
import { Router } from '@angular/router';
import { AUTHENTICATED_USER } from '../app.constants';
import { Goal } from '../model/goal.model';

@Component({
  selector: 'app-list-goals',
  templateUrl: './list-goals.component.html',
  styleUrls: ['./list-goals.component.css']
})
export class ListGoalsComponent implements OnInit {

  goals: Goal[]; 
  message: String;

  // = [
  //   new Goal(1, 'Learn to Dance', false, new Date()),
  //   new Goal(2, 'Visit USA', false, new Date()),
  //   new Goal(3, 'Become an Expert at Angular', false, new Date())
    
  //   // {
  //   //   id: 1,
  //   //   description: 'Learn to Dance'
  //   // },
  //   // {
  //   //   id: 2,
  //   //   description: 'Visit USA'
  //   // },
  //   // {
  //   //   id: 3,
  //   //   description: 'Become an Expert at Angular'
  //   // }
  // ];

  constructor(
    private goalService: GoalDataService,
    private router: Router) { }

  ngOnInit() {
    this.refreshGoals();
  }

  refreshGoals() {
    this.goalService.retrieveAllGoals(sessionStorage.getItem(AUTHENTICATED_USER)).subscribe(
      response => {
        console.log(response);
        this.goals = response;
      }
    );
  }

  deleteGoal(id: number) {
    console.log(`delete goal ${id}`);
    this.goalService.deleteGoal(sessionStorage.getItem(AUTHENTICATED_USER), id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of Goal ${id} Successful!`;
        this.refreshGoals();
      }
    );
  }

  updateGoal(id) {
    console.log(`update goal ${id}`);
    this.router.navigate(['goals', id]);
  }

  addGoal() {
    this.router.navigate(['goals', -1]);
  }

}
