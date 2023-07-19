import ValueObject from "../value-object";

class StubValueObject extends ValueObject {

}

describe("Value object units tests", () => {
  it("should set value", () => {
    let vo = new StubValueObject("string value");
    expect(vo.value).toBe("string value");

    vo = new StubValueObject({ prop1: "value1" });
    expect(vo.value).toStrictEqual({ prop1: "value1" });
  });

  it("should convert to string", () => {
    let vo = new StubValueObject(1);
    expect(vo + "").toBe("1");
  })

  it("should be a immutable object", () => {
    const obj = {
      prop1: 'value1',
      deep: {
        prop2: 'value2',
        prop3: new Date()
      }
    };

    const vo = new StubValueObject(obj);

    expect(() => {
      (vo as any).value.prop1 = 'test';
    }).toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'");

    expect(vo.value.deep.prop3).toBeInstanceOf(Date);
  })
})