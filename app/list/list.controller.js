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
    vm.query = '';


    /**
     * Triggered when the search button is click or on enter key press
     *
     * @return void
     */
    function getList() {
        vm.loading = true;
        vm.limit = 8;
        vm.offset = 0;
        vm.list = [];
        vm.noData = false;
        listService.getList(vm.query, vm.limit, vm.offset).then(function (data) {
            vm.offset += vm.limit;
            vm.list = data;
            vm.loading = false;
            vm.noData = !data.length;
        })
    }

    /**
     * Triggered when the load more button is click
     *
     * @return void
     */
    function loadMore() {
        listService.getList(vm.query, vm.limit, vm.offset).then(function (data) {
            if(data.length) {
                vm.offset += vm.limit;
                vm.list = vm.list.concat(data);
            }
        })
    }

    /**
     * Triggered when the modal is opened
     *
     * @params id String
     *
     * @return void
     */
    function getAlbums(id) {
        vm.modalLoading = true;
        listService.getAlbums(id).then(function(data) {
            vm.modalLoading = false;
            vm.showModal.albums = data;
        })
    }

    /**
     * Triggered when the modal is opened
     *
     * @params id String
     *
     * @return void
     */
    function getTracks(id) {
        vm.modalLoading = true;
        listService.getTracks(id).then(function(data) {
            vm.modalLoading = false;
            vm.showModal.tracks = data;
        })
    }


    /**
     * Triggered when a list item is clicked
     *
     * @params item Object
     *
     * @return void
     */
    function openModal(item) {
        if(item.type == "artist"){
            getAlbums(item.id);
        } else {
            getTracks(item.id);
        }
        vm.showModal = item;
    }

    /**
     * Triggered when the modal close button is clicked
     *
     * @params $event {Angular Event Object}
     *
     * @return void
     */
    function closeModal($event) {
        vm.showModal = false;
    }
}
