const chai = require("chai")
const server = require("../../../bin/www")
const expect = chai.expect
const request = require("supertest")
const _ = require("lodash")
describe("Foods", () => {
  describe("GET /foods", () => {
    it("should return all the foods", done => {
      request(server)
        .get("/foods")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array")
          const result = _.map(res.body, food => {
            return {type: food.type, author: food.author}
          })
          expect(result).to.deep.include({type: "Chinese", author: "leon"})

          done(err)
        })
    })
  })

  describe("GET /foods/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching food", done => {
        request(server)
          .get("/foods/5dc00b631c9d4400005e4c46")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            const result = _.map(res.body, food => {
              return {type: food.type, author: food.author}
            })
            expect(result).to.deep.include({type: "Chinese", author: "leon"})

            done(err)
          })

      })
    })
    describe("when the id is invalid", () => {
      it("should return the NOT found message", done => {
        request(server)
          .get("/foods/5dc7777")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .expect({message: "Food NOT Found!"}, (err) => {
            done(err)
          })
      })
    })
  })
  describe("POST /foods", () => {
    it("should return confirmation message and update ", () => {
      const food = {
        type: "Korea food",
        author: "Stephen",
        likes: 0
      }

      return request(server)
        .post("/foods")
        .send(food)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then(res => {
          expect(res.body.message).equals("Food Added!")
        })
    })
    after(() => {
      return request(server)
        .get("/foods")
        .expect(200)
        .then(res => {
          const result = _.map(res.body, food => {
            return {
              type: food.type,
              author: food.author,
              likes: food.likes,
            }
          })
          expect(result).to.deep.include({
            type: "Korea food",
            author:"Stephen",
            likes: 0 })
        })
    })
  })
  describe("PUT /foods/:id/likes", () => {
    describe("when the id is valid", () => {
      it("should return a message and likes increase 1", () => {
        return request(server)
          .put("/foods/5dc00b631c9d4400005e4c46/likes")
          .expect(200)
          .then(res => {
            expect(res.body).to.include({
              message: "Submit your like Successfully!"
            })

          })
      })
      after(() => {
        return request(server)
          .get("/foods/5dc00b631c9d4400005e4c46")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then(res => {
            const result = _.map(res.body, food => {
              return {
                type: food.type,
                author: food.author,
                // likes:food.likes,
              }
            })
            expect(result).to.deep.include({
              type: "Chinese",
              author: "leon"
            })
          })
      })
    })
    describe("when the id is invalid", () => {
      it("should return a 404 and a message for invalid donation id", () => {
        return request(server)
          .put("/foods/50000/likes")
          .expect(200)

          .then(res => {
            expect(res.body).to.include({
              message: "Food NOT Found!"
            })

          })


      })
    })
  })
  describe("DELETE /foods/:id", () => {
    describe("when the id is valid", () => {
      it("should delete the matching food", () => {
        return request(server)
          .delete("/foods/5db398d91c9d4400001bc11f")
          .expect(200)
          .then(resp => {
            expect(resp.body).to.include({
              message: "Food  Successfully Deleted!"
            })

          })
      })

      after(() => {
        return request(server)
          .get("/foods")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then(res => {
            const result = _.map(res.body, foods => {
              return {
                type: foods.type,
                author: foods.author,
                likes: foods.likes,
              }
            })
            expect(result).to.not.include({type: "cake", author: "cole", likes: 0})
          })
      })
    })

    describe("when the id is invalid", () => {
      it("should return the NOT found message", () => {
        request(server)
          .delete("/foods/999")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .expect({message: "Food NOT DELETED!"}, () => {
          })

      })

    })

  })

})



