import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Goal } from 'src/app/list-goals/list-goals.component';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class GoalDataService {

  constructor(private http: HttpClient) { }

  retrieveAllGoals(username) {
    return this.http.get<Goal[]>(`${API_URL}/users/${username}/goals`);
  }

  deleteGoal(username, id) {
    return this.http.delete<Goal>(`${API_URL}/users/${username}/goals/${id}`);
  }

  retrieveGoal(username, id) {
    return this.http.get<Goal>(`${API_URL}/users/${username}/goals/${id}`);
  }

  updateGoal(username, id, goal) {
    return this.http.put(`${API_URL}/users/${username}/goals/${id}`, goal);
  }

  createGoal(username, goal) {
    return this.http.post(`${API_URL}/users/${username}/goals`, goal);
  }

  // We'll not use the same thing like in the welcome-data.service.ts. Now we'll use http interceptors
  // that will enable us to add a specific request header to every request. 
}
