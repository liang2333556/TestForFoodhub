const chai = require("chai")
const server = require("../../../bin/www")

const expect = chai.expect
const request = require("supertest")
const _ = require("lodash")
describe("Essay", () => {
  describe("GET /userEssay", () => {
    it("should return all the essays", done => {
      request(server)
        .get("/userEssay")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          const result = _.map(res.body, essay => {
            return {author: essay.author, content: essay.content}
          })
          expect(result).to.deep.include({
            author: "leon",
            content: "i like Chinese food",
          })


          done(err)
        })
    })
  })

  describe("GET /userEssay/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching essay", done => {
        request(server)
          .get("/userEssay/5db457e2039c72136c12dc47")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            const result = _.map(res.body, essay => {
              return {author: essay.author, content: essay.content}
            })
            expect(result).to.deep.include({
              author: "leon",
              content: "i like Chinese food",

            })

            done(err)
          })

      })
    })

    describe("when the id is invalid", () => {
      it("should return the NOT found message", () => {
        request(server)
          .delete("/userEssay/999")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .expect({message: "Essay NOT Found!"}, () => {
          })
      })
    })
  })

  describe("POST /userEssay", () => {
    it("should return confirmation message and update ", () => {
      const essay = {
        author: "Cloe",
        content: "I like drink cola!",
        likes: 0,
      }

      return request(server)
        .post("/userEssay")
        .send(essay)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then(res => {
          expect(res.body.message).equals("Essay Successfully Added!")
        })
    })
    after(() => {
      return request(server)
        .get("/userEssay")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then(res => {
          const result = _.map(res.body, essay => {
            return {
              author: essay.author,
              content: essay.content,
              likes: essay.likes,
            }
          })
          expect(result).to.deep.include({
            author: "Cloe",
            content: "I like drink cola!",
            likes: 0,
          })
        })
    })
  })


  describe("PUT /userEssay/:id/likes", () => {
    describe("when the id is valid", () => {
      it("should return a message and likes increase 1", () => {
        return request(server)
          .put("/userEssay/5db3951f7c581c1020e11697/likes")
          .expect(200)
          .then(res => {
            expect(res.body).to.include({
              message: "Submit your like Successfully!"
            })

          })
      })
      after(() => {
        return request(server)
          .get("/userEssay")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then(res => {
            const result = _.map(res.body, essay => {
              return {
                author: essay.author,
                content: essay.content,

              }
            })
            expect(result).to.deep.include({
              author: "Cloe",
              content: "I like drink cola!",
            })
          })
      })
    })
    describe("when the id is invalid", () => {
      it("should return a 404 and a message for invalid donation id", () => {
        return request(server)
          .put("/userEssay/999/likes")
          .expect(200)
          .then(res => {
            expect(res.body).to.include({
              message: "Fail to submit!"
            })

          })


      })
    })
  })

  describe("DELETE /userEssay/:id", () => {
    describe("when the id is valid", () => {
      it("should delete the matching product", () => {
        return request(server)
          .delete("/userEssay/5db393261c9d4400001bc113")
          .expect(200)
          .then(resp => {
            expect(resp.body).to.include({
              message: "Essay Successfully Deleted!"
            })

          })
      })

      after(() => {
        return request(server)
          .get("/userEssay")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then(res => {
            const result = _.map(res.body, essay => {
              return {
                author: essay.author,
                content: essay.content,
                comment: essay.comment,
                likes: essay.likes,
              }
            })
            expect(result).to.not.include({likes: 0, author: "JK", content: "I hate any foods"})
          })
      })
    })

    describe("when the id is invalid", () => {
      it("should return the NOT found message", () => {
        request(server)
          .delete("/userEssay/999")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .expect({message: "Essay NOT DELETED!"}, () => {
          })

      })

    })

  })

})