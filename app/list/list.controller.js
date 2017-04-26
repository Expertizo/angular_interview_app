angular
    .module('app')
    .controller('ListController', ListController);

ListController.$inject = ['$http', 'listService'];

function ListController( $http, listService ) {
    var vm = this;

    vm.getList = getList;
    vm.query = '';


    function getList() {
        vm.loading = true;
        vm.noData = false;
        listService.getList(vm.query).then(function (data) {
            vm.list = data;
            vm.loading = false;
            vm.noData = !data.length;
        })
    }
}
