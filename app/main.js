var mymodal = angular.module('app', [
  'siTable'
  ]);

mymodal.controller('ctrl', function($scope, $http) {
  $scope.filter = {
    $: ''
  };
  $scope.params = {};

  $scope.inputBounce= { "updateOn":"blur"};

  // var url = 'products.json';
  // $http.get(url).then(function(products) {
  //   $scope.products = products.data;
  // });

  $scope.blabla=function(productForm){
      if(!productForm.email.$valid)
        alert("yippie");
    }

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

  $scope.showModal = false;
  $scope.updateModal = function(product){
    console.log(product);
    $scope.editProduct = product;
    $scope.showModal = !$scope.showModal;
  };

  $scope.showModalAbout = false;
  $scope.aboutModal = function(product) {    
    $scope.aboutProduct = product;
    $scope.showModalAbout = !$scope.showModalAbout; 
  }

  $scope.showModalDelete = false;
  $scope.deleteModal = function(product) {
    $scope.deleteProduct = product;
    $scope.showModalDelete = !$scope.showModalDelete;
  }
});



mymodal.directive('modal', function ($filter) {
  return {
    template: '<div class="modal fade">' + 
    '<div class="modal-dialog">' + 
    '<div class="modal-content">' + 
    '<div class="modal-header">' + 
    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
    '<h4 class="modal-title">{{ title }}</h4>' + 
    '</div>' + 
    '<div class="modal-body" ng-transclude></div>' + 
    '</div>' + 
    '</div>' + 
    '</div>',
    restrict: 'E',
    transclude: true,
    replace:true,
    scope:true,
    link: function postLink(scope, element, attrs) {
      // scope.title = attrs.title;

      scope.$watch(attrs.visible, function(value){
        if(value == true) {
          $(element).modal('show');
        }
        else
          $(element).modal('hide');
      });

      $(element).on('shown.bs.modal', function(){
        scope.$apply(function(){
          scope.$parent[attrs.visible] = true;
        });
      });

      $(element).on('hidden.bs.modal', function(){
        scope.$apply(function(){
          scope.$parent[attrs.visible] = false;
        });
      });

      //Add/Edit modal open
      $('#modalEdit').on("show.bs.modal", function () {
        console.log("Edit" + scope.$parent.editProduct);
        if (scope.$parent.editProduct == null) {
          scope.title = "Add product";
        } else {
          scope.title = "Edit product";
          $("#nameModal").val(scope.$parent.editProduct.name);
          $("#priceModal").val(scope.$parent.editProduct.price);
          $("#countModal").val(scope.$parent.editProduct.count);
          $("#emailModal").val(scope.$parent.editProduct.email);
        }
      });

      //Add/Edit modal hidden      
      $('#modalEdit').on("hidden.bs.modal", function () {        
        $("#nameModal, #emailModal").val("");          
        $("#priceModal").val(0);
        $("#countModal").val(0);
      });

      // About modal open
      $("#modalAbout").on("show.bs.modal", function () {
        scope.title = "About product";
        $("#nameAbout").text("Name product:    " + scope.$parent.aboutProduct.name);
        $("#priceAbout").text("Price:    " + $filter('currency')(scope.$parent.aboutProduct.price));
        $("#countAbout").text("Count:    " + scope.$parent.aboutProduct.count);
        $("#emailAbout").text("Supplier email:    " + scope.$parent.aboutProduct.email);
      });

      //Delete modal open
      $("#modalDelete").on("show.bs.modal", function () {
        console.log("Delete" + scope.$parent.deleteProduct);
        $("#question").text("Are you sure you want to perform " + scope.$parent.deleteProduct.name + "?");
      });

      // Add/Edit product
      $("#doneProd").on("click", function() {
        if ($("#nameModal").val()) {
          if (scope.$parent.editProduct == null) {
            scope.$parent.products.push({
              name: $("#nameModal").val(),
              price: parseFloat($("#priceModal").val(), 10),
              count: parseInt($("#countModal").val(), 10),
              email: $("#emailModal").val()
            });
          } else {
            scope.$parent.products[
            scope.$parent.products
            .indexOf(scope.$parent.editProduct)
            ] = {
              name: $("#nameModal").val(),
              price: parseFloat($("#priceModal").val(), 10),
              count: parseInt($("#countModal").val(), 10),
              email: $("#emailModal").val()
            };
          }
          $('#modalEdit').modal("hide");
          $("#nameModal, #emailModal").val("");
          $("#priceModal").val(0);
          $("#countModal").val(0);
        }
      });

      //Delete product
      $("#yesDelete").on("click", function() {
        scope.$parent.products
        .splice(scope.$parent.products
          .indexOf(scope.$parent.deleteProduct), 1);
        $("#modalDelete").modal("hide");
      });
      $("#noDelete").on("click", function() {
        $("#modalDelete").modal("hide");
      });
    } 
  }
});

mymodal.directive('nameValidator', function() {
  return {
    restrict: 'A',
    require:  'ngModel',
    link: function (scope, element, attr, mCtrl) {
      function myValidation(value) {
        if (value != "" && value.length < 16 && !/[^\s]/.test(value)) {
          mCtrl.$setValidity('nameValidator', true);
        } else {
          mCtrl.$setValidity('nameValidator', false);
        }
        return value; 
      }
        // mCtrl.$parsers.push(myValidation);
        // scope.validateInput = myValidation;
      element.blur( () => {
        if (element.val() != "" && element.val().length < 16 && /[^\s]/.test(element.val())) {
          mCtrl.$setValidity('nameValidator', true);
          // $("#errorName").hide();
        } else {
          mCtrl.$setValidity('nameValidator', false);
          // $("#errorName").show();
        }
        // $("#errorName").val("You name is required.");
        // return element.val(); 
          // modelCtrl.$showValidationMessage = modelCtrl.$dirty;
        // mCtrl.$parsers.push(myValidation);
        // mCtrl.$has
        // formCtrl

          // scope.$apply();
      });
    }
  }
});

mymodal.directive('countValidator', function() {
  return {
    restrict: 'A',
    require:  'ngModel',
    link: function (scope, element, attr, mCtrl) {
      function myValidation(value) {
        if (value > -1 && value != null) {
          mCtrl.$setValidity('countValidator', true);
        } else {
          mCtrl.$setValidity('countValidator', false);
        }
        return value;
      }
      mCtrl.$parsers.push(myValidation);
    }
  }
});

mymodal.directive('blurToCurrency', function($filter){
  return {
    scope: {
      amount  : '='
    },
    link: function(scope, el, attrs){
      el.val($filter('currency')(scope.amount));
      
      el.bind('focus', function(){
        el.val(scope.amount);
      });
      
      el.bind('input', function(){
        scope.amount = el.val();
        scope.$apply();
      });
      
      el.bind('blur', function(){
        el.val($filter('currency')(scope.amount));
      });
    }
  }
});

