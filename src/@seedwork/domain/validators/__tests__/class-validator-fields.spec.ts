import * as libClassValidator from 'class-validator';

import ClassValidatorFields from "../class-validator-fields";

class StubClassValidatorFields extends ClassValidatorFields<{field: string}> {}

describe("ClassValidatorFields units tests", () => {
  it("should initialize validator with errors and validatedData null", () => {
    const validator = new StubClassValidatorFields();
    expect(validator.errors).toBe(null);
    expect(validator.validatedData).toBe(null);
  })

  it("should validate with errors", () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync');
    spyValidateSync.mockReturnValue([
      { property: 'field', constraints: { isRequired: 'some error' } }
    ]);
    const validator = new StubClassValidatorFields();
    expect(validator.validate(null)).toBeFalsy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(validator.validatedData).toBeNull();
    expect(validator.errors).toStrictEqual({ field: ['some error'] });
  })

  it("should validate without errors", () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync');
    spyValidateSync.mockReturnValue([]);
    const validator = new StubClassValidatorFields();
    expect(validator.validate({ field: 'value' })).toBeTruthy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(validator.validatedData).toStrictEqual({ field: 'value' });
    expect(validator.errors).toBeNull();
  })
})