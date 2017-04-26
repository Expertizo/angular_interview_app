angular
    .module('app')
    .factory('listService', listService);

listService.$inject = ['$http', '$q'];

function listService( $http, $q ) {
    // Exposed attributes & methods
    return {
        getList: getList,
        getAlbums: getAlbums,
        getTracks: getTracks
    };

    function getList(query, limit, offset) {
        var ref = 'https://api.spotify.com/v1/search?q=' + query + '*&type=artist&offset=' + offset / 2 + '&limit=' + limit / 2,
            ref2 = 'https://api.spotify.com/v1/search?q=' + query + '*&type=album&offset=' + offset / 2+ '&limit=' + limit / 2,
            artistsList, albumsList;

        return $q.when($http.get(ref)).then(function(artists) {

            return $q.when($http.get(ref2)).then(function(albums) {

                artistsList = artists.data.artists.items;
                albumsList =  albums.data.albums.items;

                return _.sortBy(_.union(artistsList, albumsList), 'name');
            })
        })
    }

    function getAlbums(id) {
        var ref = 'https://api.spotify.com/v1/artists/' + id + '/albums';

        return $q.when($http.get(ref)).then(function(albums) {
            if(albums.data) {
                return albums.data.items;
            }
        })
    }

    function getTracks(id) {
        var ref = 'https://api.spotify.com/v1/albums/' + id + '/tracks';

        return $q.when($http.get(ref)).then(function(albums) {
            if(albums.data) {
                return albums.data.items;
            }
        })
    }
}