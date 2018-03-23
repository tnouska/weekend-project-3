let todoApp = angular.module('todoApp', []);
todoApp.controller('TodoController', ['$http', function ($http) {
    let self = thisl;
    self.todoArray = [];
}])