angular
    .module('app')
    .factory('listService', listService);

listService.$inject = ['$http', '$q'];

function listService( $http, $q ) {
    // Exposed attributes & methods
    return {
        getList: getList
    };

    function getList(query) {
        var ref = 'https://api.spotify.com/v1/search?q='+query+'*&type=artist';
        var ref2 = 'https://api.spotify.com/v1/search?q='+query+'*&type=album';

        return $q.when($http.get(ref)).then(function(artists) {
            return $q.when($http.get(ref2)).then(function(albums) {
                return {artists: artists.data.artists.items, albums: albums.data.albums.items};
            })
        })
    }
}