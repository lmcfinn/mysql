# MySQL Bamazon
## How it works
1. customer.js:
- Once run, the app shows all product offering
- It then asks for input on which item the customer wants to buy
- Next, it asks for how many of that item the customer wants to buy
- Once completed, the app notifies the customer the purchase is complete and also the total cost
2. manager.js
- Once run, the app lets the manager do the following four things:
  - View Products for Sale
  - View Low Inventory (lower than 5)
  - Add to Inventory
  - Add New Product
- With the View Low Inventory option, the app returns only SKUs with inventory lower than 5; if all products have inventory higher than 5, the app returns a notice saying "All products have sufficient inventory"
- With the Add to Inventory option, the app propmts for input on which SKU to add and then how many to add. Once done, the app returns a notice on the new inventory count
- With the Add New Product option, the app prompts for input on SKU#, product name, department, list price and inventory count. Once done, it returns the notice that the new product has been added.
## Demo video
-https://youtu.be/v92rv33cVjQ

