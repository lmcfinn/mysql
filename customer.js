var mysql = require("mysql");
var inquirer = require("inquirer");
var config = require('./config.js');

// console.log(config.configInfo)

var connection = mysql.createConnection(config.configInfo);

//Connect to bamazon database
connection.connect(function(err) {
  if (err) {
  	throw err
  };
  // console.log("connected as id " + connection.threadId);
});

//Get data from all columns from products table
connection.query("SELECT * FROM products", function(err, res) {
	if(err) {
		throw err
	};
	//Display all returned data
	for (var i =0; i < res.length; i++) {
		console.log("SKU: " + res[i].item_id + " | Product: " + res[i].product_name + " | Price: " + "$" + res[i].price)
	}
	//Run customer query for input
	askCustomer();
});

function askCustomer() {
	inquirer.prompt([{
		type: "input",
		name: "product_id",
		message: "Please enter the SKU number of the item you would like to purchase:",
		validate: function(value) {
	      if (isNaN(value) === false) {
	        return true;
	      }
	      return false;
	      // console.log("Please enter the ID.")
		}
	},{
		type: "input",
		name: "quantity",
		message: "How many would you like to purchase:",
		validate: function(value) {
	      if (isNaN(value) === false) {
	        return true;
	      }
	      return false;
		}
	}]).then(function(answer) {

		// console.log("item id: " + answer.product_id)
		// console.log("order quantity: " + answer.quantity)

    	//Select all columns from products table based on item_id input
    	connection.query("SELECT * FROM products WHERE ?", {item_id: answer.product_id}, function(err, res) {
	      	// console.log(res)
	      	if(err) {
	      		throw err
	      	};
	      	// console.log(res[0].product_name);
	      	// console.log(res[0].stock_quantity)

	      	//Calculate total cost if inventory available
	      	if (res[0].stock_quantity > answer.quantity) {
	      		var ticketTotal = res[0].price * answer.quantity
	      		// console.log(ticketTotal)
	      		console.log("Purchase completed! Your total today is $" + ticketTotal + ".");

	      		//Deduct number of item purchased from inventory 
	      		connection.query("UPDATE products SET ? WHERE ?", [{
					  stock_quantity: res[0].stock_quantity - answer.quantity
					}, {
					  item_id: answer.product_id
					}], function(err, res) {
						if (err) {
							throw err
						};
					});
	      	} else {
	      		console.log("Sorry we don't have enough in stock for this item.")
	      	}
	    	connection.end();	
		});
	});
};

