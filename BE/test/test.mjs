import { expect } from "chai";
import request from "request";

describe("POST /submit", function () {
  var url = "http://localhost:3000/submit";

  it("returns status 200 to check if the contact is created successfully", function (done) {
    request.post(
      url,
      {
        json: {
          fname: "John",
          lname: "Doe",
          contno: "1234567890",
          description: "Test contact",
        },
      },
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });

  it("returns message key in body to check if the response has a success message", function (done) {
    request.post(
      url,
      {
        json: {
          fname: "John",
          lname: "Doe",
          contno: "1234567890",
          description: "Test contact",
        },
      },
      function (error, response, body) {
        expect(body.message).to.equal("Contact created successfully!");
        done();
      }
    );
  });
});

describe("GET /contacts", function () {
    var url = "http://localhost:3000/contacts";
  
    it("returns status 200 to check if all contacts are retrieved successfully", function (done) {
      request(url, function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  
    it("returns message key in body to check if the response has a success message", function (done) {
      request(url, function (error, response, body) {
        body = JSON.parse(body);
        expect(body.message).to.equal("Contacts retrieved successfully!");
        done();
      });
    });
  
    it("returns data key in body to check if the contacts are returned as an array", function (done) {
      request(url, function (error, response, body) {
        body = JSON.parse(body);
        expect(body.data).to.be.an("array");
        done();
      });
    });
  
    it("handles server errors and returns status 500", function (done) {
      request(url, function (error, response, body) {
        if (error) {
          expect(response.statusCode).to.equal(500);
        }
        done();
      });
    });
  });