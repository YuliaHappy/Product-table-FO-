angular
  .module('app')
  .controller('ProductsController', ProductsController);


function ProductsController ($scope) {
  // Initial information for table
  $scope.products = [
    {
      name: "Product_1",
      price: 12352.25,
      count: 5,
      email: "abc_1@mail.ru"
    },
    {
      name: "Product_2",
      price: 15352.25,
      count: 3,
      email: "abc_2@mail.ru"
    },
    {
      name: "Product_3",
      price: 13352.25,
      count: 4,
      email: "abc_3@mail.ru"
    }
  ];
  // Open/hide model edit/add
  $scope.showModalUpdate = false;
  $scope.updateModal = function(product){
    $scope.editProduct = product;
    $scope.showModalUpdate = !$scope.showModalUpdate;
  };
  // Open/hide modal about
  $scope.showModalAbout = false;
  $scope.aboutModal = function(product) {    
    $scope.aboutProduct = product;
    $scope.showModalAbout = !$scope.showModalAbout; 
    // var modalInstance = $modal.open({
    //   templateUrl: '../modalAbout.html',
    //   controller: 'modalDialogController',
    //   size: 'sm',
    //   resolve: {
    //     recurrence: function () {
    //       return product.recurrence;
    //     }
    //   }
    // });
  }
  // Open/hide modal delete
  $scope.showModalDelete = false;
  $scope.deleteModal = function(product) {
    $scope.deleteProduct = product;
    $scope.showModalDelete = !$scope.showModalDelete;
  }

  $scope.filter = {
    $: ''
  };
  $scope.params = {};

  $scope.inputBounce= { "updateOn":"blur"};

  $scope.blabla=function(productForm){
      if(!productForm.email.$valid)
        alert("yippie");
    }

  
};
