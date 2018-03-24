let todoApp = angular.module('todoApp', []);
todoApp.controller('TodoController', ['$http', function ($http) {
    let self = this;
    self.todoArray = [];

    self.addTask = function (newTask) {
        console.log('newTask inside of addTask: ', newTask);
        newTask.completed = false;
        $http({
            method: 'POST',
            url: '/todo',
            data: newTask
        }).then(function (response) {
            console.log('response in addTask: ', response);
            self.getTasks();
        }).catch(function (err) {
            console.log('error in addTask: ', err);
        })
    }
    self.deleteTask = function (taskId) {
        $http({
            method: 'DELETE',
            url: '/todo/' + taskId
        }).then(function (response) {
            console.log('Delete Completed');
            self.getTasks();
        }).catch(function (error) {
            console.log('error in deleteTask: ',error);
            
        })
    }
    self.getTasks = function () {
        $http({
            method: 'GET',
            url: '/todo',
        }).then(function (response) {
            console.log('this is the response in getTasks: ', response);
            self.todoArray = response.data;
        }).catch(function (error) {
            console.log('error in getTasks: ', error);
        })
    }
    self.markComplete = function (taskId, newStatus) {
        $http({
            method: 'PUT',
            url: '/todo/' + taskId,
            data: {completed: newStatus}
        }).then(function (response) {
            self.getTasks();
        }).catch(function (err) {
            console.log('error inside of markComplete: ', err);
            
        })
    }

    self.getTasks();
}])

