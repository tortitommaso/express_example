var app = require("../app");
var cheerio = require("cheerio");
var supertest = require("supertest");
describe("html response", function() {
	var request;
	beforeEach(function() {
		request = supertest(app)
		.get("/")
		.set("User-Agent", "a cool browser")
		.set("Accept", "text/html");
	});
	it("returns an HTML response", function(done) {
		request
		.expect("Content-Type", /html/)
		.expect(200)
		.end(done);
	});
	it("returns your User Agent", function(done) {
request
		.expect(function(res) {
			var htmlResponse = res.text;
			var $ = cheerio.load(htmlResponse);
			var userAgent = $(".user-agent").html().trim();
			if (userAgent !== "a cool browser") {
				throw new Error("User Agent not found");
			}
		})
		.end(done);
	});
});