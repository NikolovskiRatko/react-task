import "@testing-library/jest-dom";

const originalError = console.error;

beforeAll(() => {
  console.error = (...args: any[]) => {
    const msg = typeof args[0] === "string" ? args[0] : "";
    if (msg.includes("ReactDOMTestUtils.act") && msg.includes("deprecated")) {
      return;
    }
    originalError(...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
