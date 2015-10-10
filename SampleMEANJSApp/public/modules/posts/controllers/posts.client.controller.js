'use strict';

var posts = angular.module('posts');
// Posts controller
posts.controller('PostsController', ['$scope', '$stateParams', 'Authentication', 'Posts',
	function($scope, $stateParams, Authentication, Posts) {
		this.authentication = Authentication;
		// lists of posts
		this.posts = Posts.query();


		// // Find existing Post
		// $scope.findOne = function() {
		// 	$scope.post = Posts.get({ 
		// 		postId: $stateParams.postId
		// 	});
		// };
	}
]);

posts.controller('PostsCreateController', ['$scope', '$stateParams', '$location', 'Authentication', 'Posts',
	
	function($scope, $stateParams, $location, Authentication, Posts) {
		$scope.authentication = Authentication;

		// Create new Post
		$scope.create = function() {
			// Create new Post object
			var post = new Posts ({
				title: this.title,
				description: this.description,
				category: this.category,
				gender: this.gender,
				price: this.price,
				email: this.email,
				phone: this.phone

			});

			// Redirect after save
			post.$save(function(response) {
				$location.path('posts/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.description = '';
				$scope.category = '';
				$scope.gender = '';
				$scope.price = '';
				$scope.email = '';
				$scope.phone = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}

]);
posts.controller('PostsEditController', ['$scope', '$stateParams', '$location', 'Authentication', 'Posts',
	
	function($scope, $stateParams, $location, Authentication, Posts) {
		$scope.authentication = Authentication;

		// Update existing Post
		$scope.update = function() {
			var post = $scope.post;

			post.$update(function() {
				$location.path('posts/' + post._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}

]);


posts.controller('PostsDeleteController', ['$scope', '$stateParams', '$location', 'Authentication', 'Posts',
	function($scope, $stateParams, $location, Authentication, Posts) {
		$scope.authentication = Authentication;

		// Remove existing Post
		$scope.remove = function(post) {
			if ( post ) { 
				post.$remove();

				for (var i in $scope.posts) {
					if ($scope.posts [i] === post) {
						$scope.posts.splice(i, 1);
					}
				}
			} else {
				$scope.post.$remove(function() {
					$location.path('posts');
				});
			}
		};
	}
]);