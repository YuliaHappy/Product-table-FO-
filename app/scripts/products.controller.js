angular
  .module('app', ['siTable'])
  .controller('ProductsController', ProductsController);


function ProductsController () {
  // Initial information for table
  this.products = [
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
  this.showModalUpdate = false;
  this.updateModal = function(product){
    this.editProduct = product;
    this.showModal = !this.showModal;
  };
  // Open/hide modal about
  this.showModalAbout = false;
  this.aboutModal = function(product) {    
    this.aboutProduct = product;
    this.showModalAbout = !this.showModalAbout; 
  }
  // Open/hide modal delete
  this.showModalDelete = false;
  this.deleteModal = function(product) {
    this.deleteProduct = product;
    this.showModalDelete = !this.showModalDelete;
  }

  this.filter = {
    $: ''
  };
  this.params = {};

  this.inputBounce= { "updateOn":"blur"};

  this.blabla=function(productForm){
      if(!productForm.email.$valid)
        alert("yippie");
    }

  
});
