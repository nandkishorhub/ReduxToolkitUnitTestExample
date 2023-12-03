import "@testing-library/jest-dom";
import { server } from "../mocks/server";

// mock of localstorage
const storagePrototype = {
  getItem: function (key) {
    return localStorageMock[key] || null;
  },
  setItem: function (key, value) {
    if (!localStorageMock[key]) {
      this.length++;
    }
    localStorageMock[key] = value.toString();
  },
  removeItem: function (key) {
    if (localStorageMock[key]) {
      this.length--;
    }
    delete localStorageMock[key];
  },
  clear: function () {
    Object.keys(localStorageMock).forEach(
      (key) => delete localStorageMock[key]
    );
    this.length = 0;
  },
  length: 0,
};

export const localStorageMock = Object.create(storagePrototype);
// eslint-disable-next-line no-undef
beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
    writable: true,
  });
});
// eslint-disable-next-line no-undef
beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});
// eslint-disable-next-line no-undef
afterAll(() => {
  console.log("afetrall");
  server.close();
});
// eslint-disable-next-line no-undef
afterEach(() => {
  console.log("reset handler");
  server.resetHandlers();
});

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
