const {
  capitalize,
  getSum,
  getItem,
  getIngredientDescr,
  getAddressDescr,
  getTypeDescr,
  createResources
} = require("../helpers");

describe("Helpers", () => {
  it("capitalize function return Test", () => {
    expect(capitalize("test")).toBe("Test");
  });

  it("getSum function return sum of object", () => {
    const example = {
      test1: {
        price: 50,
      },
      test2: [
        {
          price: 100,
          count: 2,
        },
        {
          price: 200,
          count: 1,
        }
      ],
      test3: {
        multiplier: 2,
      },
      count: 3,
    };
    expect(getSum(example)).toBe(2700);
  });

  it("getItem function return correct value", () => {
    const tests = [
      {
        id: 1,
        name: "first",
      },
      {
        id: 2,
        name: "second",
      },
    ]
    expect(getItem(tests, 1)).toEqual(tests[0]);
  });

  it("getIngredientDescr function return ingredients description", () => {
    const arrayElements = [
      {
        name: "Грибы",
      },
      {
        name: "Селедка",
      },
      {
        name: "Сметана",
      },
    ]
    const result = "Грибы, Селедка, Сметана";
    expect(getIngredientDescr(arrayElements)).toBe(result);
  });

  it("getAddressDescr function return address description", () => {
    const address = {
      street: "street",
      building: "building",
      flat: "flat",
    }
    expect(getAddressDescr(address)).toBe(`${address.street}, д. ${address.building}, оф. ${address.flat}`);
  });

  it("getTypeDescr function return type description", () => {
    expect(getTypeDescr("light")).toBe("на тонком тесте.");
  });

  it("createResources function return object", () => {
    expect(typeof createResources({})).toBe("object");
  });
});
