angular
    .module('app')
    .controller('ListController', ListController);

ListController.$inject = ['$http', 'listService'];

function ListController( $http, listService ) {
    var vm = this;

    vm.getList = getList;
    vm.openModal = openModal;
    vm.closeModal = closeModal;
    vm.loadMore = loadMore;
    vm.limit = 8;
    vm.offset = 0;
    vm.query = '';


    function getList() {
        vm.loading = true;
        vm.noData = false;
        listService.getList(vm.query, vm.limit, vm.offset).then(function (data) {
            vm.offset += vm.limit;
            vm.list = data;
            vm.loading = false;
            vm.noData = !data.length;
        })
    }

    function loadMore() {
        listService.getList(vm.query, vm.limit, vm.offset).then(function (data) {
            if(data.length) {
                vm.offset += vm.limit;
                vm.list = vm.list.concat(data);
            }
        })
    }

    function getAlbums(id) {
        vm.modalLoading = true;
        listService.getAlbums(id).then(function(data) {
            vm.modalLoading = false;
            vm.showModal.albums = data;
        })
    }

    function getTracks(id) {
        vm.modalLoading = true;
        listService.getTracks(id).then(function(data) {
            vm.modalLoading = false;
            vm.showModal.tracks = data;
        })
    }

    function openModal(item) {
        if(item.type == "artist"){
            getAlbums(item.id);
        } else {
            getTracks(item.id);
        }
        vm.showModal = item;
    }

    function closeModal($event) {
        vm.showModal = false;
    }
}
