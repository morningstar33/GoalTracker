package com.dgs.restful.webservices.goaltrackerservice.goal;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class GoalJpaResource {
	
	@Autowired
	private GoalHardCodedService goalService;
	
	@Autowired
	private GoalJpaRepository goalJpaRepository;

	@GetMapping("/jpa/users/{username}/goals")
	public List<Goal> getAllGoals(@PathVariable String username) {
		return goalJpaRepository.findByUsername(username); 
	}
	
	@GetMapping("/jpa/users/{username}/goals/{id}")
	public Goal getGoal(
			@PathVariable String username, @PathVariable long id) {
		return goalJpaRepository.findById(id).get();
	}
	
	@DeleteMapping("/jpa/users/{username}/goals/{id}")
	public ResponseEntity<Void> deleteGoal(
			@PathVariable String username, @PathVariable long id) {
		
		goalJpaRepository.deleteById(id);
		
		return ResponseEntity.noContent().build(); 
	}
	
	@PutMapping("/jpa/users/{username}/goals/{id}")
	public ResponseEntity<Goal> updateGoal(
			@PathVariable String username, @PathVariable long id, @RequestBody Goal goal) {
		
		// If you use @RequestBody you need to add a default constructor
		Goal updatedGoal = goalJpaRepository.save(goal);
		return new ResponseEntity<Goal>(goal, HttpStatus.OK);
	}
	
	@PostMapping("/jpa/users/{username}/goals")
	public ResponseEntity<Void> createGoal(@PathVariable String username, @RequestBody Goal goal) {
		
		goal.setUsername(username); 
		Goal createdGoal = goalJpaRepository.save(goal); 
		
		// We're taking the current request path and appending "/id"
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
			.path("/{id}").buildAndExpand(createdGoal.getId()).toUri(); 
		
		// Return the location:
		return ResponseEntity.created(uri).build();
	}
	
}