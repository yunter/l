/**
 * Created by Vern on 8/5/16.
 */
angular.element(document).ready(function () {
  //
  });
angular.module('starter.filters', ['ngSanitize'])
    .filter('addTargetBlank', function(){
        return function(x) {
            var tree = angular.element('<div>' + x + '</div>');//defensively wrap in a div to avoid 'invalid html' exception
            tree.find('a').attr('target', '_blank'); //manipulate the parse tree
            var htmlObj = tree.html();
            if(htmlObj != "undefined" ) {
                tree = htmlObj.replace(/&quot;/g, '');
            }
            return angular.element('<div>').append(tree).html(); //trick to have a string representation
        }
    });