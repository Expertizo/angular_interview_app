angular
    .module('app')
    .controller('ListController', ListController);

ListController.$inject = ['$http', 'listService'];

function ListController( $http, listService ) {
    var vm = this;

    vm.getList = getList;
    vm.query = '';


    function getList() {
        listService.getList(vm.query).then(function (data) {
            vm.list = data;
        })
    }
}
