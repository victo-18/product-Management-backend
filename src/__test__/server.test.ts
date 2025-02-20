
import request from "supertest";
import server from "../server";
import {connectionDB} from '../server'
import db from "../config/settingDB";


//
describe("it should send back a json response fron server", () => {
  it("The server must to send a error", async () => {
    const resul = await request(server).post("/api/product").send({});
    expect(resul.status).toBe(400);
    expect(Array.isArray(resul.body.errorMessage)).toBe(true); // Debe ser un array
    expect(resul.body.errorMessage[0]).toHaveProperty("msg", "The product name is required")
   
  });
});
jest.mock("../config/settingDB")

describe('It should handle a databe error',()=>{
   it("Should send an error console when the connection have been brocken",async()=>{
    jest.spyOn(db,'authenticate').mockRejectedValueOnce(new Error('The databse connectios was refuce'))
    const consoleSpyOn = jest.spyOn(console,'log')
    await connectionDB()
    expect(consoleSpyOn).toHaveBeenCalledWith(expect.stringContaining('The databse connectios was refuce'))
   })
})