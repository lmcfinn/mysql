
var mysql = require("mysql");
var inquirer = require("inquirer");
var config = require('./config.js');

// console.log(config.configInfo)

var connection = mysql.createConnection(config.configInfo);

connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId);
});

function runQuery() {
	inquirer.prompt({
		name: "options",
		type: "rawlist",
		message: "What would you like to do?",
		choices: [
			"View products for sale",
			"View low inventory",
			"Add to inventory",
			"Add new product"
		]
	}).then(function(answer) {
		switch (answer.options) {
			case "View products for sale":
				viewProducts();
				break;

			case "View low inventory":
				viewLowInventory();
				break;

			case "Add to inventory":
				addInventory();
				break;

			case "Add new product":
				addProduct();
				break;
		}

	});
};

function viewProducts() {
	connection.query("SELECT * FROM products", function(err, res) {
		if(err) {
			throw err
		};

		for (var i =0; i < res.length; i++) {
			console.log("Product ID: " + res[i].item_id + " | Product Name: " + res[i].product_name 
				+ " | Price: " + "$" + res[i].price + " | Inventory: " + res[i].stock_quantity)
		}
		connection.end();
	});
};

function viewLowInventory() {
	connection.query("SELECT * FROM products", function(err, res) {
		// console.log(res)
		if(err) {
			throw err
		};
		for (var j = 0; j < res.length; j++) {

			if (res[j].stock_quantity < 5) {

				console.log("Product ID: " + res[j].item_id + " | Product Name: " + res[j].product_name 
				+ " | Inventory: " + res[j].stock_quantity)
			}
		};
    	connection.end();
	});
};

function addInventory() {
	inquirer.prompt([{
		name: "product_id",
		type: "input",
		message: "Please enter the product ID of the item you would like to add:",
		validate: function(value) {
	      if (isNaN(value) === false) {
	        return true;
	      }
	      return false;
		}
	},{
		name: "quantity",
		type: "input",
		message: "How many would you like to add: ",
		validate: function(value) {
	      if (isNaN(value) === false) {
	        return true;
	      }
	      return false;
		}
	}]).then(function(answer){

		// console.log("item id: " + answer.product_id)
		// console.log("quantity added: " + answer.quantity)

		connection.query("SELECT * FROM products WHERE ?", {item_id: answer.product_id}, function(err, res) {
			// console.log(res)
			if(err) {
				throw err
			};

			var currentStock = res[0].stock_quantity;
			var updatedQuantity = currentStock + parseInt(answer.quantity)
			// console.log(updatedQuantity)

			connection.query("UPDATE products SET ? WHERE ?", [{
			  stock_quantity: updatedQuantity
			}, {
			  item_id: answer.product_id
			}], function(err, res) {
				if (err) {
					throw err
				};
				console.log("New inventory: " + updatedQuantity)
			});
			connection.end();	
		});
	});
};

function addProduct() {

	inquirer.prompt([{
		name: "id",
		type: "input",
		message: "Enter product id:",
		validate: function(value) {
	      	if (isNaN(value) === false) {
	        	return true;
	      	}
	      	return false;
		}
	},{
		name: "productName",
		type: "input",
		message: "Enter product name:"
	},{
		name: "department",
		type: "input",
		message: "Enter department:"
	},{
		name: "listPrice",
		type: "input",
		message: "Enter list price:",
		validate: function(value) {
	    	if (isNaN(value) === false) {
	        	return true;
	      	}
	      	return false;
		}
	},{
		name: "stock",
		type: "input",
		message: "Enter inventory:",
		validate: function(value) {
	    	if (isNaN(value) === false) {
	        	return true;
	      	}
	      	return false;
		}
	}]).then(function(answer) {
		// console.log(answer)

		var newProductId = parseInt(answer.id);
		// console.log("id " + newProductId);
		var newProductPrice = parseFloat(answer.listPrice);
		// console.log("price " + newProductPrice)
		var newProductQuantity = parseInt(answer.stock);
		// console.log("stock " + newProductQuantity)

		connection.query("INSERT INTO products SET ?", {
			item_id: newProductId,
			product_name: answer.productName,
			department_name: answer.department,
			price: newProductPrice,
			stock_quantity: newProductQuantity
		}, function(err, res) {
			if (err) {
				throw err
			}
			console.log("New product added!")
		});
		connection.end();
	});
};

runQuery();






































