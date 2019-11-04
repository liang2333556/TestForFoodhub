const chai = require("chai")
const server = require("../../../bin/www")
const expect = chai.expect
const request = require("supertest")
const _ = require("lodash")
describe("Products", () => {
  describe("GET /products", () => {
    it("should return all the products", done => {
      request(server)
        .get("/products")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array")
          const result = _.map(res.body, product => {
            return {type: product.type, name: product.name, price: product.price}
          })
          expect(result).to.deep.include({type: "Chinese", name: "dumplings", price: 10})

          done(err)
        })
    })
  })

  describe("GET /products/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching product", done => {
        request(server)
          .get("/products/5db44c8e3d1eaa46dc2a5cc6")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            const result = _.map(res.body, product => {
              return {type: product.type, name: product.name, price: product.price}
            })
            expect(result).to.deep.include({type: "Chinese", name: "dumplings", price: 10})

            done(err)
          })

      })
    })

    describe("when the id is invalid", () => {
      it("should return the NOT found message", () => {
        request(server)
          .delete("/products/999")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .expect({message: "Product NOT Found!"}, () => {
          })
      })
    })
  })

  describe("POST /products", () => {
    it("should return confirmation message and update ", () => {
      const product = {
        type: "Asia food",
        name: "leon",
        price: 2,
        likes: 1,
      }

      return request(server)
        .post("/products")
        .send(product)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then(res => {
          expect(res.body.message).equals("Product Successfully Added!")
        })
    })
    after(() => {
      return request(server)
        .get("/products")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then(res => {
          const result = _.map(res.body, product => {
            return {
              type: product.type,
              price: product.price,
              name: product.name,
              likes: product.likes,
            }
          })
          expect(result).to.deep.include({
            type: "Asia food",
            name:"leon",
            price:2,
            likes:1,})
        })
    })
  })


  describe("PUT /products/:id/likes", () => {
    describe("when the id is valid", () => {
      it("should return a message and likes increase 1", () => {
        return request(server)
          .put("/products/5db44c8e3d1eaa46dc2a5cc6/likes")
          .expect(200)
          .then(res => {
            expect(res.body).to.include({
              message: "Submit your like Successfully!"
            })

          })
      })
      after(() => {
        return request(server)
          .get("/products")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then(res => {
            const result = _.map(res.body, product => {
              return {
                type: product.type,
                price: product.price,
                name: product.name,
              }
            })
            expect(result).to.deep.include({
              type: "Chinese",
              name: "dumplings",
              price: 10
            })
          })
      })
    })
    describe("when the id is invalid", () => {
      it("should return a 404 and a message for invalid donation id", () => {
        return request(server)
          .put("/products/50000/likes")
          .expect(200)

          .then(res => {
            expect(res.body).to.include({
              message: "Product NOT Found!"
            })

          })


      })
    })
  })

  describe("DELETE /products/:id", () => {
    describe("when the id is valid", () => {
      it("should delete the matching product", () => {
        return request(server)
          .delete("/products/5db3991a1c9d4400001bc123")
          .expect(200)
          .then(resp => {
            expect(resp.body).to.include({
              message: "Product Successfully Deleted!"
            })

          })
      })

      after(() => {
        return request(server)
          .get("/products")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then(res => {
            const result = _.map(res.body, products => {
              return {
                type: products.type,
                name: products.name,
                price: products.price,
                likes: products.likes,
              }
            })
            expect(result).to.not.include({type: "China", name: "apple", price: 1, likes: 0})
          })
      })
    })

    describe("when the id is invalid", () => {
      it("should return the NOT found message", () => {
        request(server)
          .delete("/products/999")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .expect({message: "Product NOT DELETED!"}, () => {
          })

      })

    })

  })

})