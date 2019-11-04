const chai = require("chai")
const server = require("../../../bin/www")
const expect = chai.expect
const request = require("supertest")
const _ = require("lodash")
describe("search", () => {

  describe("POST /search", () => {
    it("should return the result of search ", () => {
      const result = {
        name:"c"
      }

      return request(server)
        .post("/search")
        .send(result)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then(res => {
          const result = _.map(res.body, result => {
            return {
              name: result.name,
            }
          })

          expect(result).to.deep.include({
            name:"cake"
          })

        })
    })


  })
})
