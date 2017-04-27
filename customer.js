var mysql = require("mysql");
var inquirer = require("inquirer");
var config = require('./config.js');

// console.log(config.configInfo)

var connection = mysql.createConnection(config.configInfo);

connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId);
});

connection.query("SELECT * FROM products", function(err, res) {
	if(err) throw err;

	for (var i =0; i < res.length; i++) {
		console.log("Product ID: " + res[i].item_id + " | Product Name: " + res[i].product_name + " | Price: " + "$" + res[i].price)
	}
	askCustomer();
});

function askCustomer() {
	inquirer.prompt([{
		type: "input",
		name: "product_id",
		message: "Please enter the product ID of the item you would like to purchase:",
		validate: function(value) {
	      if (isNaN(value) === false) {
	        return true;
	      }
	      return false;
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

		var query = "SELECT * FROM products WHERE ?";
    	connection.query(query, {item_id: answer.product_id}, function(err, res) {
	      	// console.log(res)
	      	if(err) {
	      		throw err
	      	};
	      	// console.log(res[0].product_name);
	      	// console.log(res[0].stock_quantity)
	      	// console.log("Product ID: " + res[0].item_id + " | Product Name: " + res[0].product_name + " | Price: " + "$" + res[0].price)

	      	if (res[0].stock_quantity > answer.quantity) {
	      		var ticketTotal = res[0].price * answer.quantity
	      		// console.log(ticketTotal)
	      		console.log("Purchase completed! Your total today is $" + ticketTotal + ".");

	      		connection.query("UPDATE products SET ? WHERE ?", [{
					  stock_quantity: res[0].stock_quantity - answer.quantity
					}, {
					  item_id: answer.product_id
					}], function(err, res) {});
	      	} else {
	      		console.log("Sorry we don't have enough in stock for this item.")
	      	}
	    	connection.end();	
		});
		// connection.end();
	});
};

