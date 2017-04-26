angular
    .module('app')
    .controller('ListController', ListController);

ListController.$inject = ['$http', 'listService'];

function ListController( $http, listService ) {
    var vm = this;

    vm.getList = getList;
    vm.openModal = openModal;
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

    function getAlbums(id) {
        console.log(listService);
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

    function closeModal(item) {
        vm.showModal = false;
    }
}
