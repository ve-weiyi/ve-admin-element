import { defineMock } from "./base";

export default defineMock([
  {
    url: "guest/get_guest",
    method: ["GET"],
    body: {
      code: 200,
      data: { id: 1, device_id: "mock-device-id" },
      msg: "ok",
    },
  },
]);
