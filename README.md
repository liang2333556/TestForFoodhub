# Assignment 1 - Agile Software Practice.

Name: Ang Li

## Overview.
To accept the essay  from the user and transmit the food recommended user provided to the foodlist.  Others can see the food recommended from the foodlist and Essaylist.Users can buy items from the productslist,they can have their own order.Also users can comment for the essay and give likes for essays.

## API endpoints. 

 + GET /foods - Get all foods in foodslist.
 + GET /foods/:id - Get the specific food by its id
 + POST /foods - Add a new kind of food in foodlist
 + PUT /foods/:id -Give like for the specific food by its id 
 + GET /products - Get all products in productslist.
 + GET /products/:id - Get the specific product by its id
 + POST /products - Add a new kind of product in productslist
 + PUT /products/:id -Give like for the specific product by its id 
 + GET /userEssay - Get all essays in foodslist.
 + GET /userEssay/:id - Get the specific essay by its id
 + POST /userEssay - Add a new essay in essaylist
 + PUT /userEssay/:id -Give like for the specific essay by its id 
 + POST/order-Add a new order including the customer_id and one to many products_id
 +POST/regist-Add new user in the userslist
 +POST/log-Check the valid users and log in
 +POST/search-Fuzzy search,find the product by the element in it name.
## Data model.

[datamodel]:./img/picture.png


![][datamodel]

## Sample Test execution.

. . . . . In this section include a listing of the output from running your tests. Simply copy the output from your terminal and past it into a fenced block, as shown below. Do not use a screenshot.

~~~
  Catalogue
  Foods
    GET /foods
GET /foods 200 850.837 ms - 6537
      √ should return all the foods (943ms)
    GET /foods/:id
      when the id is valid
GET /foods/5dc00b631c9d4400005e4c46 200 44.179 ms - 141
        √ should return the matching food (54ms)
      when the id is invalid
GET /foods/5dc7777 200 2.535 ms - 29
        √ should return the NOT found message
    POST /foods
POST /foods 200 91.712 ms - 124
      √ should return confirmation message and update  (99ms)
GET /foods 200 41.935 ms - 6701
    PUT /foods/:id/likes
      when the id is valid
PUT /foods/5dc00b631c9d4400005e4c46/likes 200 63.421 ms - 130
        √ should return a message and likes increase 1 (70ms)
GET /foods/5dc00b631c9d4400005e4c46 200 22.870 ms - 141
      when the id is invalid
PUT /foods/50000/likes 200 1.607 ms - 223
        √ should return a 404 and a message for invalid donation id
    DELETE /foods/:id
      when the id is valid
DELETE /foods/5db398d91c9d4400001bc11f 200 32.331 ms - 41
        √ should delete the matching food (39ms)
GET /foods 200 28.559 ms - 6701
      when the id is invalid
        √ should return the NOT found message
DELETE /foods/999 200 0.601 ms - 219

  Products
    GET /products
GET /products 200 120.362 ms - 28086
      √ should return all the products (128ms)
    GET /products/:id
      when the id is valid
GET /products/5db44c8e3d1eaa46dc2a5cc6 200 21.160 ms - 188
        √ should return the matching product
      when the id is invalid
        √ should return the NOT found message
DELETE /products/999 200 1.772 ms - 225
    POST /products
POST /products 200 36.223 ms - 144
      √ should return confirmation message and update  (42ms)
GET /products 200 87.539 ms - 28266
    PUT /products/:id/likes
      when the id is valid
PUT /products/5db44c8e3d1eaa46dc2a5cc6/likes 200 41.498 ms - 153
        √ should return a message and likes increase 1 (46ms)
GET /products 200 97.165 ms - 28266
      when the id is invalid
PUT /products/50000/likes 200 1.077 ms - 229
        √ should return a 404 and a message for invalid donation id
    DELETE /products/:id
      when the id is valid
DELETE /products/5db3991a1c9d4400001bc123 200 19.146 ms - 43
        √ should delete the matching product
GET /products 200 95.147 ms - 28266
      when the id is invalid
        √ should return the NOT found message
DELETE /products/999 200 1.056 ms - 225

  Essay
    GET /userEssay
GET /userEssay 200 96.541 ms - 42815
      √ should return all the essays (102ms)
    GET /userEssay/:id
      when the id is valid
GET /userEssay/5db457e2039c72136c12dc47 200 19.162 ms - 433
        √ should return the matching essay
      when the id is invalid
        √ should return the NOT found message
DELETE /userEssay/999 200 0.890 ms - 221
    POST /userEssay
POST /userEssay 200 25.026 ms - 180
      √ should return confirmation message and update 
GET /userEssay 200 87.539 ms - 43058
    PUT /userEssay/:id/likes
      when the id is valid
PUT /userEssay/5db3951f7c581c1020e11697/likes 200 37.744 ms - 1106
        √ should return a message and likes increase 1 (42ms)
GET /userEssay 200 83.792 ms - 43058
      when the id is invalid
PUT /userEssay/999/likes 200 0.927 ms - 218
        √ should return a 404 and a message for invalid donation id
    DELETE /userEssay/:id
      when the id is valid
DELETE /userEssay/5db393261c9d4400001bc113 200 19.858 ms - 41
        √ should delete the matching product
GET /userEssay 200 80.015 ms - 43058
      when the id is invalid
        √ should return the NOT found message
DELETE /userEssay/999 200 1.129 ms - 221

  order
    POST /order
POST /order 200 49.895 ms - 200
      √ should return confirmation message and update  (58ms)

  search
    POST /search
POST /search 200 21.743 ms - 725
      √ should return the result of search 

  Regist
    POST /regist
POST /regist 200 24.477 ms - 119
      √ should return confirmation message and update 
      
  POST /log
    When the pwd and name are valid
POST /log 200 70.698 ms - 19566
      √ should return confirmation message and update  (76ms)


  28 passing (3s)

~~~

## Extra features.

Apart from the testing methods I learnt from the lab,I try and finished the testing for search function,it is a fuzzy search.In the test block,you can input some element in the products'name ,the result can be the certain product's name.
I test the order including the valid user_id and product_id,the products stored in an array.


