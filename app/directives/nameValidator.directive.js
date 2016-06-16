angular
  .module('app')
  .directive('nameValidator', NameValidator);

function NameValidator () {
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
};
