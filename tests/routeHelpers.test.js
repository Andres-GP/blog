const { isActiveRoute } = require("../server/helpers/routeHelpers");

describe("isActiveRoute helper", () => {
  it('debe retornar "active" si las rutas coinciden', () => {
    expect(isActiveRoute("/", "/")).toBe("active");
  });

  it('debe retornar "" si las rutas no coinciden', () => {
    expect(isActiveRoute("/about", "/")).toBe("");
  });
});
