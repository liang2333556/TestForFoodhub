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

The data model image in the ./image file!


## Sample Test execution.

. . . . . In this section include a listing of the output from running your tests. Simply copy the output from your terminal and past it into a fenced block, as shown below. Do not use a screenshot.

~~~
  Catalogue
GET /foods 200 506.981 ms - 15345
      √ should return all the foods (776ms)
    GET /foods/:id
      when the id is valid
GET /foods/5db44fab3d1eaa46dc2a5cc7 200 20.857 ms - 161
        √ should return the matching food
      when the id is invalid
GET /foods/5db032341c9d4 200 2.179 ms - 29
        √ should return the NOT found message
    POST /foods
POST /foods 200 93.136 ms - 124
      √ should return confirmation message and update  (102ms)
GET /foods 200 73.700 ms - 15509
    PUT /foods/:id/likes
      when the id is valid
PUT /foods/5db44fab3d1eaa46dc2a5cc7/likes 200 51.197 ms - 138
        √ should return a message and likes increase 1 (58ms)
GET /foods/5db44fab3d1eaa46dc2a5cc7 200 19.167 ms - 161
      when the id is invalid
PUT /foods/50000/likes 200 1.769 ms - 223
        √ should return a 404 and a message for invalid donation id
    DELETE /foods/:id
      when the id is valid
DELETE /foods/5db398d91c9d4400001bc11f 200 26.416 ms - 41
        √ should delete the matching food
GET /foods 200 75.770 ms - 15509
      when the id is invalid
        √ should return the NOT found message
DELETE /foods/999 200 1.213 ms - 219

  Products
    GET /products
GET /products 200 85.191 ms - 16025
      √ should return all the products (94ms)
    GET /products/:id
      when the id is valid
GET /products/5db44c8e3d1eaa46dc2a5cc6 200 21.052 ms - 187
        √ should return the matching product
      when the id is invalid
        √ should return the NOT found message
DELETE /products/999 200 1.609 ms - 225
    POST /products
POST /products 200 37.048 ms - 144
      √ should return confirmation message and update  (44ms)
GET /products 200 68.299 ms - 16205
    PUT /products/:id/likes
      when the id is valid
PUT /products/5db44c8e3d1eaa46dc2a5cc6/likes 200 43.183 ms - 152
        √ should return a message and likes increase 1 (48ms)
GET /products 200 37.771 ms - 16205
      when the id is invalid
PUT /products/50000/likes 200 0.487 ms - 229
        √ should return a 404 and a message for invalid donation id
    DELETE /products/:id
      when the id is valid
DELETE /products/5db3991a1c9d4400001bc123 200 16.229 ms - 43
        √ should delete the matching product
GET /products 200 44.787 ms - 16205
      when the id is invalid
        √ should return the NOT found message
DELETE /products/999 200 0.818 ms - 225

  Essay
    GET /userEssay
GET /userEssay 200 86.508 ms - 27262
      √ should return all the essays (92ms)
    GET /userEssay/:id
      when the id is valid
GET /userEssay/5db457e2039c72136c12dc47 200 21.015 ms - 433
        √ should return the matching essay
      when the id is invalid
        √ should return the NOT found message
DELETE /userEssay/999 200 0.796 ms - 221
    POST /userEssay
POST /userEssay 200 25.889 ms - 180
      √ should return confirmation message and update 
GET /userEssay 200 38.651 ms - 27505
    PUT /userEssay/:id/likes
      when the id is valid
PUT /userEssay/5db3951f7c581c1020e11697/likes 200 36.832 ms - 1105
        √ should return a message and likes increase 1 (40ms)
GET /userEssay 200 42.670 ms - 27505
      when the id is invalid
PUT /userEssay/999/likes 200 0.875 ms - 218
        √ should return a 404 and a message for invalid donation id
    DELETE /userEssay/:id
      when the id is valid
DELETE /userEssay/5db393261c9d4400001bc113 200 15.727 ms - 41
        √ should delete the matching product
GET /userEssay 200 35.138 ms - 27505
      when the id is invalid
        √ should return the NOT found message
DELETE /userEssay/999 200 0.456 ms - 221

  Regist
    POST /regist
POST /regist 200 30.456 ms - 119
      √ should return confirmation message and update 

  log
    POST /log
POST /log 200 35.233 ms - 11392
      √ should return confirmation message and update  (39ms)

  order
    POST /order
POST /order 200 43.273 ms - 200
      √ should return confirmation message and update  (48ms)


  27 passing (2s)
~~~

## Extra features.

. . . . Briefly state any extra features of your assignment work that you feel should be high-lighted. This relates to 'independent learning' you have undertaken during the assignment . . . . .

