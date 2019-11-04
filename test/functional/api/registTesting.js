const chai = require("chai")
const server = require("../../../bin/www")
const expect = chai.expect
const request = require("supertest")
const _ = require("lodash")
describe("Regist", () => {

  describe("POST /regist", () => {
    it("should return confirmation message and update ", () => {
      const user = {
        name: "lxq",
        pwd: "lxq123123",
      }

      return request(server)
        .post("/regist")
        .send(user)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then(res => {
          const result = _.map(res.body, user => {
            return {
              name: user.name,
              pwd: user.pwd,
            }
          })
          expect(res.body.message).equals("User Successfully Added!")

          expect(result).to.deep.include({name: "lxq", pwd: "lxq123123"})

        })
    })


  })
})