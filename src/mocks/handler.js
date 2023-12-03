import { http, HttpResponse, delay } from "msw";

export const handlers = [
  http.get("http://localhost:5000/api/notes/fetchallnotes", async () => {
    return HttpResponse.json([
      {
        _id: "62e3af44b2c220f4b64fdd70",
        user: "62dfaed0d9c9c81704e6da85",
        title: "Learn React course with Redux",
        description:
          "React works excellent with redux for efficient state mangement",
        tag: "reactjs",
        date: "2022-07-29T09:58:28.648Z",
        __v: 0,
      },
      {
        _id: "62e3b065b2c220f4b64fdd7a",
        user: "62dfaed0d9c9c81704e6da85",
        title: "Save Soil",
        description:
          "Excellent campaign started by Sadhguru where he and his team would travel from London to Delhi on Bike",
        tag: "SaveSoil",
        date: "2022-07-29T10:03:17.771Z",
        __v: 0,
      },
    ]);
  }),
  http.post("http://localhost:5000/api/notes/addnote", async ({ request }) => {
    const payload = await request.json();
    return HttpResponse.json([
      {
        _id: "62e3af44b2c220f4b64fdd00",
        user: "62e3af44b2c220f4b64fdd00",
        title: `${payload.title}`,
        description: `${payload.description}`,
        tag: `${payload.tag}`,
        date: "2022-07-29T09:58:28.648Z",
        __v: 0,
      },
    ]);
  }),
  http.delete(
    "http://localhost:5000/api/notes/deletenote/62e3af44b2c220f4b64fdd00",
    async () => {
      return HttpResponse.json({
        note: {
          _id: "62e3af44b2c220f4b64fdd00",
          user: "62e3af44b2c220f4b64fdd00",
          title: "Namobudhay",
          description: "budha is logical symbol",
          tag: "om",
          date: "2022-07-29T09:58:28.648Z",
          __v: 0,
        },
      });
    }
  ),
  http.put(
    "http://localhost:5000/api/notes/updatenote/62e3b065b2c220f4b64fdd7a",
    async ({ request }) => {
      console.log("update note", request);
      const payload = await request.json();
      return HttpResponse.json({
        _id: "62e3b065b2c220f4b64fdd7a",
        user: "62e3b065b2c220f4b64fdd7a",
        title: `${payload.title}`,
        description:
          "Excellent campaign started by Sadhguru where he and his team would travel from London to Delhi on Bike",
        tag: "SaveSoil",
        date: "2022-07-29T10:03:17.771Z",
        __v: 0,
      });
    }
  ),
  http.post("http://localhost:5000/api/auth/createuser", async () => {
    return HttpResponse.json({
      success: true,
      authtoken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2OWJjZDIyZGM0ODI3NmU2MDg3ZDYxIn0sImlhdCI6MTcwMTQyODQzNH0.cwe3da1cLCO7H7HWyKrI7b31FA2w8swY9ZO3RlfX2ME",
    });
  }),
  // here we have added handler for login functionality
  // it is returning back random jwt token which we are not
  // going to validate actually instead we are just returning back
  // some token to test login happy scenario
  http.post("http://localhost:5000/api/auth/login", async () => {
    return HttpResponse.json({
      success: true,
      authtoken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2OWJjZDIyZGM0ODI3NmU2MDg3ZDYxIn0sImlhdCI6MTcwMTQyODQzNH0.cwe3da1cLCO7H7HWyKrI7b31FA2w8swY9ZO3RlfX2ME",
    });
  }),
];
