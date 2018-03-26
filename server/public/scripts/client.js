let todoApp = angular.module('todoApp', ['ngMaterial']);
todoApp.controller('TodoController', ['$http', function ($http) {
    let self = this;
    self.todoArray = [];

    self.addTask = function (newTask) {
        console.log('newTask inside of addTask: ', newTask);
        if (newTask === undefined) {
            console.log('task not entered.');
        }else if (newTask.task === undefined){
            console.log('task not entered.');
        }else if(newTask.catagory === undefined){
            console.log('must select catagory');
        }else{
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
        });
   
        }
    };
    self.deleteTask = function (taskId) {
        swal({
            title: "Are you sure?",
            text: "This will be deleted forever.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Your task has been forever deleted.", {
                        icon: "success",
                    });
                    $http({
                        method: 'DELETE',
                        url: '/todo/' + taskId
                    }).then(function (response) {
                        console.log('Delete Completed');
                        self.getTasks();
                    }).catch(function (error) {
                        console.log('error in deleteTask: ', error);
                    });
                } else {
                    swal("Your task has not changed.");
                }
            });

    };
    self.getTasks = function () {
        $http({
            method: 'GET',
            url: '/todo',
        }).then(function (response) {
            console.log('this is the response in getTasks: ', response);
            self.todoArray = response.data;
        }).catch(function (error) {
            console.log('error in getTasks: ', error);
        });
    };
    self.markComplete = function (taskId, newStatus) {
        $http({
            method: 'PUT',
            url: '/todo/' + taskId,
            data: {completed: newStatus}
        }).then(function (response) {
            self.getTasks();
        }).catch(function (err) {
            console.log('error inside of markComplete: ', err);
            
        });
    };

    self.getTasks();
}]);

