import { deepFreeze } from "./objects";

describe("Object units tests", () => {
  it("should not freeze a scalar value", () => {
    const str = deepFreeze('a');
    expect(typeof str).toBe('string');

    const booleanTrue = deepFreeze(true);
    expect(typeof booleanTrue).toBe('boolean');
    
    const booleanFalse = deepFreeze(false);
    expect(typeof booleanFalse).toBe('boolean');

    const number = deepFreeze(5);
    expect(typeof number).toBe('number');
  })

  it("should be a immutable object", () => {
    const obj = deepFreeze({
      prop1: 'value1',
      deep: {
        prop2: 'value2',
        prop3: new Date()
      }
    });

    expect(() => {
      (obj as any).prop1 = 'aaaaa';
    }).toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'");

    expect(obj.deep.prop3).toBeInstanceOf(Date);
  })
});