# MySQL Bamazon
## How it works
1. customer.js:
- Once run, the app shows all product offering
- It then asks for input on which item the customer wants to buy
- Next, it asks for how many of that item the customer wants to buy
- Once completed, the app notifies the customer the purchase is complete and also the total cost
2. manager.js
- Once run, the app lets the manager do the following four things:
  - View all products for sale
  - View products with inventory lower than 5
  - Increase inventory of any one product
  - Create a new SKU
- With View Low Inventory option, the app returns only SKUs with inventory lower than 5; if all products have inventory higher than 5, the app returns a notice saying "All products have sufficient inventory"

