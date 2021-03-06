/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";
const express = require("express");
const request = require("request-promise-native");

module.exports = function() {
	var app = express.Router();

	app.get("/", async(req, res) => {
		let options = {
			method: "GET",
			json: true,
			url: global.__controller + "/v2/users",
			auth: {}
		};
		options.auth.bearer = require(global.__base + "utils/auth").getAccessToken(req);
		try {
			let body = await request.get(options);
			return res.type("application/json").status(200).send(body);
		} catch (err) {
			console.log(err.toString());
			return res.type("text/html").status(500).send(err.toString());
		}
	});

	app.get("/:guid", async(req, res) => {
		let options = {
			method: "GET",
			json: true,
			url: global.__controller + "/v2/users/" + req.params.guid,
			auth: {}
		};
		options.auth.bearer = require(global.__base + "utils/auth").getAccessToken(req);
		try {
			let body = await request.get(options);
			return res.type("application/json").status(200).send(body);
		} catch (err) {
			console.log(err.toString());
			return res.type("text/html").status(500).send(err.toString());
		}
	});

	app.get("/uaa/id/:user_id", async(req, res) => {
		let options = {
			url: global.__controller + "/v2/info"
		};
		try {
			let body = await request.get(options);
			let optionsInner = {
				method: "GET",
				json: true,
				url: JSON.parse(body).authorizationEndpoint + "/sap/rest/user/id/" + req.params.user_id,
				auth: {}
			};
			console.log(optionsInner.url.toString());
			optionsInner.auth.bearer = require(global.__base + "utils/auth").getAccessToken(req);
			let bodyInner = await request.get(optionsInner);
			return res.type("application/json").status(200).send(bodyInner);
		} catch (err) {
			console.log(err.toString());
			return res.type("text/html").status(500).send(err.toString());
		}
	});

	app.get("/uaa/name/:username", async(req, res) => {
		let options = {
			url: global.__controller + "/v2/info"
		};
		try {
			let body = await request.get(options);
			let optionsInner = {
				method: "GET",
				json: true,
				url: JSON.parse(body).authorizationEndpoint + "/sap/rest/user/name/" + req.params.username,
				auth: {}
			};
			console.log(optionsInner.url.toString());
			optionsInner.auth.bearer = require(global.__base + "utils/auth").getAccessToken(req);
			let bodyInner = await request.get(optionsInner);
			return res.type("application/json").status(200).send(bodyInner);
		} catch (err) {
			console.log(err.toString());
			return res.type("text/html").status(500).send(err.toString());
		}
	});

	app.get("/uaa2/names", async(req, res) => {
		let options = {
			url: global.__controller + "/v2/info"
		};
		try {
			let body = await request.get(options);
			let optionsInner = {
				method: "GET",
				json: true,
				url: JSON.parse(body).authorizationEndpoint + "/sap/rest/user/names/",
				auth: {}
			};
			console.log(optionsInner.url.toString());
			optionsInner.auth.bearer = require(global.__base + "utils/auth").getAccessToken(req);
			let bodyInner = await request.get(optionsInner);
			return res.type("application/json").status(200).send(bodyInner);
		} catch (err) {
			console.log(err.toString());
			return res.type("text/html").status(500).send(err.toString());
		}
	});

	app.get("/uaa2/names/all", async(req, res) => {
		let options = {
			url: global.__controller + "/v2/info"
		};
		try {
			let body = await request.get(options);
			let optionsInner = {
				method: "GET",
				json: true,
				url: JSON.parse(body).authorizationEndpoint + "/sap/rest/user/names/",
				auth: {}
			};
			console.log(optionsInner.url.toString());
			optionsInner.auth.bearer = require(global.__base + "utils/auth").getAccessToken(req);
			let bodyInner = await request.get(optionsInner);
			//loop over bodyInner
			let names = JSON.parse(JSON.stringify(bodyInner));
			let output = [];
			for (let item of names) {
				let optionsName = {
					method: "GET",
					json: true,
					url: JSON.parse(body).authorizationEndpoint + "/sap/rest/user/name/" + item,
					auth: {}
				};
				optionsName.auth.bearer = optionsInner.auth.bearer;
				let details = await request.get(optionsName);
				output.push(item, details);
			}
			return res.type("application/json").status(200).send(JSON.stringify(output));
		} catch (err) {
			console.log(err.toString());
			return res.type("text/html").status(500).send(err.toString());
		}
	});

	app.get("/uaa2/rolecollections/", async(req, res) => {
		let options = {
			url: global.__controller + "/v2/info"
		};
		try {
			let body = await request.get(options);
			let optionsInner = {
				method: "GET",
				json: true,
				url: JSON.parse(body).authorizationEndpoint + "/sap/rest/authorization/rolecollections/",
				auth: {}
			};
			console.log(optionsInner.url.toString());
			optionsInner.auth.bearer = require(global.__base + "utils/auth").getAccessToken(req);
			let bodyInner = await request.get(optionsInner);
			return res.type("application/json").status(200).send(bodyInner);
		} catch (err) {
			console.log(err.toString());
			return res.type("text/html").status(500).send(err.toString());
		}
	});

	app.get("/uaa2/rolecollections/:roleCollectionName", async(req, res) => {
		let options = {
			url: global.__controller + "/v2/info"
		};
		try {
			let body = await request.get(options);
			let optionsInner = {
				method: "GET",
				json: true,
				url: JSON.parse(body).authorizationEndpoint + "/sap/rest/authorization/rolecollections/" + req.params.roleCollectionName,
				auth: {}
			};
			console.log(optionsInner.url.toString());
			optionsInner.auth.bearer = require(global.__base + "utils/auth").getAccessToken(req);
			let bodyInner = await request.get(optionsInner);
			return res.type("application/json").status(200).send(bodyInner);
		} catch (err) {
			console.log(err.toString());
			return res.type("text/html").status(500).send(err.toString());
		}
	});

	app.get("/uaa2/rolecollections/:roleCollectionName/roles", async(req, res) => {
		let options = {
			url: global.__controller + "/v2/info"
		};
		try {
			let body = await request.get(options);
			let optionsInner = {
				method: "GET",
				json: true,
				url: JSON.parse(body).authorizationEndpoint + "/sap/rest/authorization/rolecollections/" + req.params.roleCollectionName + "/roles",
				auth: {}
			};
			console.log(optionsInner.url.toString());
			optionsInner.auth.bearer = require(global.__base + "utils/auth").getAccessToken(req);
			let bodyInner = await request.get(optionsInner);
			return res.type("application/json").status(200).send(bodyInner);
		} catch (err) {
			console.log(err.toString());
			return res.type("text/html").status(500).send(err.toString());
		}
	});

	app.get("/uaa2/apps/", async(req, res) => {
		let options = {
			url: global.__controller + "/v2/info"
		};
		try {
			let body = await request.get(options);
			let optionsInner = {
				method: "GET",
				json: true,
				url: JSON.parse(body).authorizationEndpoint + "/sap/rest/authorization/apps/",
				auth: {}
			};
			console.log(optionsInner.url.toString());
			optionsInner.auth.bearer = require(global.__base + "utils/auth").getAccessToken(req);
			let bodyInner = await request.get(optionsInner);
			return res.type("application/json").status(200).send(bodyInner);
		} catch (err) {
			console.log(err.toString());
			return res.type("text/html").status(500).send(err.toString());
		}
	});

	app.get("/uaa2/apps/:appId", async(req, res) => {
		let options = {
			url: global.__controller + "/v2/info"
		};
		try {
			let body = await request.get(options);
			let optionsInner = {
				method: "GET",
				json: true,
				url: JSON.parse(body).authorizationEndpoint + "/sap/rest/authorization/apps/" + req.params.appId,
				auth: {}
			};
			console.log(optionsInner.url.toString());
			optionsInner.auth.bearer = require(global.__base + "utils/auth").getAccessToken(req);
			let bodyInner = await request.get(optionsInner);
			return res.type("application/json").status(200).send(bodyInner);
		} catch (err) {
			console.log(err.toString());
			return res.type("text/html").status(500).send(err.toString());
		}
	});

	app.get("/uaa2/apps/:appId/scopes", async(req, res) => {
		let options = {
			url: global.__controller + "/v2/info"
		};
		try {
			let body = await request.get(options);
			let optionsInner = {
				method: "GET",
				json: true,
				url: JSON.parse(body).authorizationEndpoint + "/sap/rest/authorization/apps/" + req.params.appId + "/scopes",
				auth: {}
			};
			console.log(optionsInner.url.toString());
			optionsInner.auth.bearer = require(global.__base + "utils/auth").getAccessToken(req);
			let bodyInner = await request.get(optionsInner);
			return res.type("application/json").status(200).send(bodyInner);
		} catch (err) {
			console.log(err.toString());
			return res.type("text/html").status(500).send(err.toString());
		}
	});

	app.get("/uaa2/apps/:appId/scopes/:scopeName", async(req, res) => {
		let options = {
			url: global.__controller + "/v2/info"
		};
		try {
			let body = await request.get(options);
			let optionsInner = {
				method: "GET",
				json: true,
				url: JSON.parse(body).authorizationEndpoint + "/sap/rest/authorization/apps/" + req.params.appId + "/scopes/" + req.params.scopeName,
				auth: {}
			};
			console.log(optionsInner.url.toString());
			optionsInner.auth.bearer = require(global.__base + "utils/auth").getAccessToken(req);
			let bodyInner = await request.get(optionsInner);
			return res.type("application/json").status(200).send(bodyInner);
		} catch (err) {
			console.log(err.toString());
			return res.type("text/html").status(500).send(err.toString());
		}
	});

	app.get("/uaa2/apps/:appId/authorities", async(req, res) => {
		let options = {
			url: global.__controller + "/v2/info"
		};
		try {
			let body = await request.get(options);
			let optionsInner = {
				method: "GET",
				json: true,
				url: JSON.parse(body).authorizationEndpoint + "/sap/rest/authorization/apps/" + req.params.appId + "/authorities",
				auth: {}
			};
			console.log(optionsInner.url.toString());
			optionsInner.auth.bearer = require(global.__base + "utils/auth").getAccessToken(req);
			let bodyInner = await request.get(optionsInner);
			return res.type("application/json").status(200).send(bodyInner);
		} catch (err) {
			console.log(err.toString());
			return res.type("text/html").status(500).send(err.toString());
		}
	});

	app.get("/uaa2/apps/:appId/roletemplates", async(req, res) => {
		let options = {
			url: global.__controller + "/v2/info"
		};
		try {
			let body = await request.get(options);
			let optionsInner = {
				method: "GET",
				json: true,
				url: JSON.parse(body).authorizationEndpoint + "/sap/rest/authorization/apps/" + req.params.appId + "/roletemplates",
				auth: {}
			};
			console.log(optionsInner.url.toString());
			optionsInner.auth.bearer = require(global.__base + "utils/auth").getAccessToken(req);
			let bodyInner = await request.get(optionsInner);
			return res.type("application/json").status(200).send(bodyInner);
		} catch (err) {
			console.log(err.toString());
			return res.type("text/html").status(500).send(err.toString());
		}
	});

	app.get("/uaa2/apps/:appId/roletemplates/:templateName", async(req, res) => {
		let options = {
			url: global.__controller + "/v2/info"
		};
		try {
			let body = await request.get(options);
			let optionsInner = {
				method: "GET",
				json: true,
				url: JSON.parse(body).authorizationEndpoint + "/sap/rest/authorization/apps/" + req.params.appId + "/roletemplates/" + req.params.templateName,
				auth: {}
			};
			console.log(optionsInner.url.toString());
			optionsInner.auth.bearer = require(global.__base + "utils/auth").getAccessToken(req);
			let bodyInner = await request.get(optionsInner);
			return res.type("application/json").status(200).send(bodyInner);
		} catch (err) {
			console.log(err.toString());
			return res.type("text/html").status(500).send(err.toString());
		}
	});

	app.get("/uaa2/apps/:appId/roletemplates/:templateName/roles/:roleName", async(req, res) => {
		let options = {
			url: global.__controller + "/v2/info"
		};
		try {
			let body = await request.get(options);
			let optionsInner = {
				method: "GET",
				json: true,
				url: JSON.parse(body).authorizationEndpoint + "/sap/rest/authorization/apps/" + req.params.appId + "/roletemplates/" + req.params.templateName +
					"/roles/" + req.params.roleName,
				auth: {}
			};
			console.log(optionsInner.url.toString());
			optionsInner.auth.bearer = require(global.__base + "utils/auth").getAccessToken(req);
			let bodyInner = await request.get(optionsInner);
			return res.type("application/json").status(200).send(bodyInner);
		} catch (err) {
			console.log(err.toString());
			return res.type("text/html").status(500).send(err.toString());
		}
	});

	app.get("/uaa2/roles/", async(req, res) => {
		let options = {
			url: global.__controller + "/v2/info"
		};
		try {
			let body = await request.get(options);
			let optionsInner = {
				method: "GET",
				json: true,
				url: JSON.parse(body).authorizationEndpoint + "/sap/rest/authorization/roles/",
				auth: {}
			};
			console.log(optionsInner.url.toString());
			optionsInner.auth.bearer = require(global.__base + "utils/auth").getAccessToken(req);
			let bodyInner = await request.get(optionsInner);
			return res.type("application/json").status(200).send(bodyInner);
		} catch (err) {
			console.log(err.toString());
			return res.type("text/html").status(500).send(err.toString());
		}
	});

	app.get("/uaa2/apps/:appId/roles", async(req, res) => {
		let options = {
			url: global.__controller + "/v2/info"
		};
		try {
			let body = await request.get(options);
			let optionsInner = {
				method: "GET",
				json: true,
				url: JSON.parse(body).authorizationEndpoint + "/sap/rest/authorization/apps/" + req.params.appId + "/roles",
				auth: {}
			};
			console.log(optionsInner.url.toString());
			optionsInner.auth.bearer = require(global.__base + "utils/auth").getAccessToken(req);
			let bodyInner = await request.get(optionsInner);
			return res.type("application/json").status(200).send(bodyInner);
		} catch (err) {
			console.log(err.toString());
			return res.type("text/html").status(500).send(err.toString());
		}
	});

	app.get("/uaa2/ownapp/", async(req, res) => {
		let options = {
			url: global.__controller + "/v2/info"
		};
		try {
			let body = await request.get(options);
			let optionsInner = {
				method: "GET",
				json: true,
				url: JSON.parse(body).authorizationEndpoint + "/sap/rest/authorization/ownapp/",
				auth: {}
			};
			console.log(optionsInner.url.toString());
			optionsInner.auth.bearer = require(global.__base + "utils/auth").getAccessToken(req);
			let bodyInner = await request.get(optionsInner);
			return res.type("application/json").status(200).send(bodyInner);
		} catch (err) {
			console.log(err.toString());
			return res.type("text/html").status(500).send(err.toString());
		}
	});

	app.get("/uaa2/ownapp/usage/", async(req, res) => {
		let options = {
			url: global.__controller + "/v2/info"
		};
		try {
			let body = await request.get(options);
			let optionsInner = {
				method: "GET",
				json: true,
				url: JSON.parse(body).authorizationEndpoint + "/sap/rest/authorization/ownapp/usage",
				auth: {}
			};
			console.log(optionsInner.url.toString());
			optionsInner.auth.bearer = require(global.__base + "utils/auth").getAccessToken(req);
			let bodyInner = await request.get(optionsInner);
			return res.type("application/json").status(200).send(bodyInner);
		} catch (err) {
			console.log(err.toString());
			return res.type("text/html").status(500).send(err.toString());
		}
	});

	return app;
};