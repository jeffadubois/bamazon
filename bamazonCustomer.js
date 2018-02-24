// Pull in required dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'yourpassword',
	database: 'bamazon'
});

// connect to the mysql server and sql database
connection.connect(function(err) {;
  if (err){throw err};
  runBamazon();
});

// validateInput makes sure that the user is supplying only positive integers for their inputs
function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}

// promptUser will prompt the user for the item/quantity they would like to purchase
function promptUser() {

	// Prompt the user to select an item
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the ID of the product you want to purchase.',
			validate: validateInput,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many?',
			validate: validateInput,
			filter: Number
		}
	]).then(function(input) {
		console.log('\n\nYou have selected: \n    Product ID = '  + input.item_id + '\n    quantity = ' + input.quantity);

		var item = input.item_id;
		var quantity = input.quantity;

		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log('ERROR: Invalid Product ID. Please select a valid Product ID.');
				displayInventory();

			} else {
				var productData = data[0];

				// If the quantity requested by the user is in stock
				if (quantity <= productData.stock_quantity) {
					console.log('Congratulations, the product you requested is in stock! Placing order!');

					// Construct the updating query string
					var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
					// console.log('updateQueryStr = ' + updateQueryStr);

					// Update the inventory
					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('\n\n  Your order has been placed!\n  Your total is $' + productData.price * quantity);
						console.log('  Thank you for shopping with us!');
						console.log("\n---------------------------------------------------------------------\n\n");

					})
				} else {
					console.log('\n\nSorry, insufficient quantity! Your order was not placed.');
					console.log("\n\n---------------------------------------------------------------------\n");
				}
				displayInventory();
			}
		})
	})
}

function printSpaces(totalLength, item){
	var length = item.toString().length;
	 //console.log("itemLength is " + length +);
	 var result = "";
	 for (var i = length; i  < totalLength; i++){
		 result = result + " ";
	 }
	 return result;
}


// displayInventory will retrieve the current inventory from the database and output it to the console
function displayInventory() {
	// Construct the db query string
	queryStr = 'SELECT * FROM products';


	connection.query(queryStr, function(err, data) {
		if (err) throw err;
		console.log('\n  INVENTORY:\n');

		var strProdRow = '';
		for (var i = 0; i < data.length; i++) {
			strProdRow = '';
			strProdRow += '  Product ID: ' + data[i].item_id + '    ';
			strProdRow += '  Product: "' + data[i].product_name + "'" +  printSpaces(38, data[i].product_name)+ '    ';
			strProdRow += '  Department: "' + data[i].department_name + "'" + printSpaces(17, data[i].department_name) +  '    ';
			strProdRow += '  Price: $' + data[i].price +  '    ';
			strProdRow += '  Stock remaining: ' + data[i].stock_quantity + '\n';
			console.log(strProdRow);
		}

	  	console.log("---------------------------------------------------------------------\n");

	  	promptUser();
	})
}

// runBamazon will execute the main application logic
function runBamazon() {
	// Display the available inventory
	displayInventory();
}


