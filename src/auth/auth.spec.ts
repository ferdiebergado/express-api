import "dotenv/config";
import request from "supertest";
import app from "../app";
import { faker } from "@faker-js/faker";
import { HTTP_STATUS } from "../http";
import messages from "../messages";

const authUrl = "/auth";
const email = faker.internet.email();
const password = faker.random.alpha(10);
const userData = {
  email,
  password,
};
const api = request(app);

const postData = (url: string, data: Record<string, any>) => {
  return api.post(url).set("content-type", "application/json").send(data);
};

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
