angular
  .module('app')
  .directive('modal', Modal);

function Modal ($filter) {
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
    replace: true,
    scope: true,
    link: function postLink(scope, element, attrs) {
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
        // console.log("Edit" + scope.$parent.editProduct);
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
};