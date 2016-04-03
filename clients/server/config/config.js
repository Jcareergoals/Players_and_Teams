var myApp = angular.module('myApp', ['ngRoute']); 
myApp.config(function($routeProvider){
	$routeProvider 
		.when('/', {templateUrl:'./partials/players.html'})
		.when('/teams', {templateUrl:'./partials/teams.html'})
		.when('/associations', {templateUrl:'./partials/associations.html'})
		.otherwise({
			redirectTo:'/'
		})
}); 

// factories
myApp.factory('PlayerFactory', function(){
	var Players = [
		{name:"Speros"}, 
		{name:"Jimmy"}, 
		{name:"Jay"}];
	var factory = {}; 
	factory.getPlayers = function(callback){
		callback(Players); 
	}
	factory.addPlayer = function(data){
		Players.push(data);
	}
	factory.removePlayer = function(data){
		Players.splice(Players.indexOf(data), 1);
	}
	return factory; 
}); 
myApp.factory('TeamFactory', function(){
	var Teams = [
		{name:"Seahawks"}, 
		{name:"49ers"}, 
		{name:"Honeybadgers"}]; 
	var team_player_associations = [{player:"Speros", team:"Seehawks"}, 
									{player:"Jimmy", team:"49ers"}]; 
	var factory = {};
	// teams  
	factory.getTeams = function(callback){
		callback(Teams);
	}
	factory.addTeam = function(data){
		Teams.push(data); 
	}
	factory.removeTeam = function(data){
		Teams.splice(Teams.indexOf(data), 1);
	}
	// associations
	factory.getAssociations = function(callback){
		callback(team_player_associations); 
	}
	factory.addAssociations = function(data){
		team_player_associations.push(data); 
	}
	factory.removeAssociations = function(data){
		team_player_associations.splice(team_player_associations.indexOf(data), 1);
	}
	return factory;
}); 

// controllers
myApp.controller('PlayersController', function($scope, PlayerFactory){
	$scope.players = []; 
	PlayerFactory.getPlayers(function(data){
		$scope.players = data; 
	});
	$scope.remove = function(data){
		PlayerFactory.removePlayer(data); 
	}
	$scope.addPlayer = function(){
		PlayerFactory.addPlayer($scope.newPlayer);
		$scope.newPlayer = {}; 
	}
}); 
myApp.controller('TeamController', function($scope, TeamFactory){
	$scope.players = []; 
	TeamFactory.getTeams(function(data){
		$scope.teams = data; 
	});
	$scope.remove = function(data){
		TeamFactory.removeTeam(data); 
	}
	$scope.addTeam = function(){
		TeamFactory.addTeam($scope.newTeam);
		$scope.newTeam = {}; 
	}
}); 
myApp.controller('AssociationsController', function($scope, PlayerFactory, TeamFactory){
	$scope.associations = {}; 
	PlayerFactory.getPlayers(function(data){
		$scope.associations.players = data; 
	}); 
	TeamFactory.getTeams(function(data){
		$scope.associations.teams = data; 
	}); 
	// hardcoded assignments 
	TeamFactory.getAssociations(function(data){
		$scope.assignments = data; 
	}); 
	$scope.addAssociation = function(){
		TeamFactory.addAssociations($scope.add);
		$scope.add = {};
	}
	$scope.remove = function(data){
		TeamFactory.removeAssociations(data); 
	}
}); 