
const chai = require("chai")
const server = require("../../../bin/www")
const expect = chai.expect
const request = require("supertest")
const _ = require("lodash")


describe("order", () => {

  describe("POST /order", () => {
    it("should return confirmation message and update ", () => {
      const order = {
        customer_id: "5db398116025453b88b179db",         //用户id
        productList: ["5db396f51c9d4400001bc117", "5db397511c9d4400001bc119"],
      }

      return request(server)
        .post("/order")
        .send(order)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then(res => {
          const result = _.map(res.body, order => {
            return {
              customer_id: order.customer_id,
              productList: order.productList,
            }
          })
          expect(res.body.message).equals("Order Successfully Added!")

          expect(result).to.deep.include({
            customer_id: "5db398116025453b88b179db",
            productList: ["5db396f51c9d4400001bc117", "5db397511c9d4400001bc119"]
          })

        })
    })


  })
})
