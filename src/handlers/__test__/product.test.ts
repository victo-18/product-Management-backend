import request from "supertest";
import server from "../../server";

describe("Should create a product in the databe base using /api/product", () => {
  it("Checking router to create a new product", async () => {
    const result = await request(server).post("/api/product").send({
      name: "Table lenovo yoga",
      price: 7000,
    });
    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty("message");
    expect(result.body.message).toEqual(
      "The product has been successfully created"
    );
    expect(result.body.message).not.toHaveProperty("error");
  });

  it("Should send a error message when all field are empty", async () => {
    const result = await request(server).post("/api/product").send({});
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("errorMessage");
  });

  it("Should send a error message when a name field is empty", async () => {
    const result = await request(server).post("/api/product").send({
      name: "",
      price: 4000,
    });
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("errorMessage");
  });

  it("Should send a error message when the price is negative number ", async () => {
    const result = await request(server).post("/api/product").send({
      name: "HeadPhone",
      price: -10,
    });
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("errorMessage");
    expect(result.body.errorMessage[0]).toHaveProperty(
      "msg",
      "Invalid price, must be greater than 0"
    );
  });
});
describe("PUT/api/product", () => {
  it("Should desplayed a error message when the product did not updated", async () => {
    const result = await request(server).put("/api/product/1").send({});
    expect(result.status).toBe(400);
    expect(result.body.errorMessage[0]).toHaveProperty(
      "msg",
      "The product name is required"
    );
    expect(result.body.errorMessage[1]).toHaveProperty(
      "msg",
      "The product name cannot be empty"
    );
    expect(result.body.errorMessage[2]).toHaveProperty(
      "msg",
      "The price is required"
    );
    expect(result.body.errorMessage).toBeInstanceOf(Array);
    expect(result.status).not.toBe(200);
    expect(result.body.errorMessage).toHaveLength(6);
  });
  it("It must validate that price has to be greather than 0", async () => {
    const result = await request(server).put("/api/product/1").send({
      name: "Motorola one",
      price: -100,
      availability: false,
    });
    expect(result.body).toBeInstanceOf(Object);
    expect(result.status).toBe(400);
    expect(result.body.errorMessage[0]).toHaveProperty(
      "msg",
      "Invalid price, must be greater than 0"
    );
    expect(result.body.errorMessage).toHaveLength(1);
  });

  it("Should has to return a json with update product", async () => {
    const result = await request(server).put("/api/product/1").send({
      name: "Motorola one",
      price: 100,
      availability: false,
    });
    expect(result.body).toBeInstanceOf(Object);
    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("data");
  });
});

describe("Get from /api/product", () => {
  it("Should sed a json response from server", async () => {
    const result = await request(server).get("/api/product");
    expect(result.status).toBe(200);
    expect(result.headers["content-type"]).toMatch(/json/);
    expect(result.body).toHaveProperty("data");
    expect(result.body.data).toBeInstanceOf(Array);

    expect(result.statusCode).not.toBe(404);
    expect(result.body).not.toHaveProperty("errorMessage");
  });
});

describe("Get element by id from /api/product", () => {
  it("It must to answer with a json with the element that has the id sent", async () => {
    const result = await request(server).get("/api/product/1");

    expect(result.headers["content-type"]).toMatch(/json/);
    expect(result.body).toHaveProperty("data");
    expect(result.status).toBe(200);
    expect(result.body.data).toBeInstanceOf(Object);
    expect(result.status).not.toBe(201);
  });
  it("Should send an error message when I send a non-existent id", async () => {
    const productId = 200;
    const response = await request(server).get(`/api/product/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual("Product not exist");
    expect(response.body).toHaveProperty("error");
  });

  it("sould return the product identify with the id sent", async () => {
    const productId = 1;
    const response = await request(server).get(`/api/product/${productId}`);

    expect(response.status).not.toBe(404);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.headers["content-type"]).toMatch(/json/);
  });

  it("Sould send a error message when the id is invalid", async () => {
    const response = await request(server).get("/api/product/hola");
    expect(response.body.errorMessage[0]).toHaveProperty("msg");
    expect(response.statusCode).toBe(400);
    expect(response.body.errorMessage[0]).toHaveProperty(
      "msg",
      "The id is invalid"
    );
    expect(response.body.errorMessage).toHaveLength(1);
  });
});

describe('PATCH /api/product',()=>{
  it("Should has to return a json with update product", async () => {
    const result = await request(server).patch("/api/product/1").send({});
    expect(result.body).toBeInstanceOf(Object);
    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("data");
  });
  it('Must be desplayed a error message when the product id un-existed ',async()=>{
    const result = await request(server).patch('/api/product/0').send({})
    expect(result.status).toBe(404)
    expect(result.body.error).toBe("Product not exist")
  })
  it('Must be desplayed a error message when id it is not number ',async()=>{
    const result = await request(server).patch('/api/product/hola').send({})
    expect(result.status).toBe(400)
    expect(result.body.errorMessage[0]).toHaveProperty("msg","The id is invalid")
  })
})
describe("DELETE /api/product", () => {
  it("Should has to return a status code 404", async () => {
    const result = await request(server).delete("/api/product/");
    expect(result.status).toBe(404);
  });
  it("Should has to return a error message when the id is un-existing", async () => {
    const result = await request(server).delete("/api/product/hola");
    expect(result.status).toBe(400);
    expect(result.body.errorMessage[0]).toHaveProperty(
      "msg",
      "The id is invalid"
    );
  });
  it("Should has to return a error message with un-exinsting product", async () => {
    const id=200
    const result = await request(server).delete(`/api/product/${id}`);
    expect(result.status).toBe(404);
    expect(result.body.error).toBe("Product doesn't exist")
  });
   it('Sould send a object with succesfull messege of delete element',async()=>{
     const id=1
     const result = await request(server).delete(`/api/product/${id}`)
     expect(result.body.message).toBe("The product has been disposed of correctly")
     expect(result.status).toBe(200)
     expect(result.headers['content-type']).toMatch(/json/)
     expect(result.body).toBeInstanceOf(Object)
   })
});