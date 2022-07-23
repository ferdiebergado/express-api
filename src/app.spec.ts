import request from "supertest";
import app from "./app";
import { HTTP_STATUS } from "./http";

// app setup
const api = request(app);

// test proper
describe("GET /", () => {
  it("returns the api info", async () => {
    const res = await api.get("/");

    expect(res.status).toEqual(HTTP_STATUS.OK);
    expect(res.body.name).toBeDefined();
    expect(res.body.version).toBeDefined();
    expect(res.body.status).toEqual("up");
  });
});
