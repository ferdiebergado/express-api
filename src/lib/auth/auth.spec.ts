import request from "supertest";
import app from "../../app";
import { faker } from "@faker-js/faker";
import { HTTP_STATUS } from "../http";
import messages from "../../messages";
import config from "../../config";

// app setup
const api = request(app);
const authUrl = "/auth";

// test data
const email = faker.internet.email();
const password = faker.random.alpha(config.validation.auth.password.minLength);
const userData = {
  email,
  password,
};

// helper functions
const postData = (url: string, data: Record<string, any>) => {
  return api.post(url).set("content-type", "application/json").send(data);
};

// test proper
describe("POST /auth/register", () => {
  const registerUrl = authUrl + "/register";

  it("returns the id of the user", async () => {
    const res = await postData(registerUrl, userData);

    expect(res.status).toEqual(HTTP_STATUS.CREATED);
    expect(res.body.id).toBeDefined();
  });

  it("returns validation error when email is empty", async () => {
    const res = await postData(registerUrl, { password });

    expect(res.status).toEqual(HTTP_STATUS.UNPROCESSABLE_ENTITY);
    expect(res.body.errors[0].field).toEqual("email");
    expect(res.body.errors[0].errors[0]).toEqual(messages.email.required);
  });
});
