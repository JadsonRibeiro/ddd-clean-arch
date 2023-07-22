import { ValidationError } from "../../errors/validation.error";
import ValidatorRules from "../validator-rules"

type AssertFunctionProps = {
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  error: ValidationError;
  params?: any[]
}

function assertIsInvalid({ value, property, rule, error, params = [] }: AssertFunctionProps) {
  expect(() => {
    (ValidatorRules as any).values(value, property)[rule](...params);
  }).toThrow(error)  
}

function assertIsValid({ value, property, rule, error, params = [] }: AssertFunctionProps) {
  expect(() => {
    (ValidatorRules as any).values(value, property)[rule](...params);
  }).not.toThrow(error)  
}

describe("Validator rules unit tests", () => {
  test("values method", () => {
    const validator = ValidatorRules.values('some value', 'field');
    expect(validator['value']).toBe('some value');
    expect(validator['property']).toBe('field');
  });

  test("required validation rule", () => {
    // invalid cases
    let arrange: {value: any, property: string, messageError: string}[] = [
      { value: null, property: 'field', messageError: 'The field is required'},
      { value: undefined, property: 'field', messageError: 'The field is required'},
      { value: "", property: 'field', messageError: 'The field is required'},
    ];

    arrange.forEach(item => {
      assertIsInvalid({ 
        value: item.value, 
        property: item.property, 
        rule: "required", 
        error: new ValidationError(item.messageError) 
      })
    });

    // valid cases
    arrange = [
      { value: "test", property: 'field', messageError: 'The field is required'},
      { value: 5, property: 'field', messageError: 'The field is required'},
      { value: 0, property: 'field', messageError: 'The field is required'},
      { value: false, property: 'field', messageError: 'The field is required'},
    ];

    arrange.forEach(item => {
      assertIsValid({ 
        value: item.value, 
        property: item.property, 
        rule: "required", 
        error: new ValidationError(item.messageError) 
      })
    });
  });

  test("string validation rule", () => {
    // invalid cases
    let arrange: {value: any, property: string}[] = [
      { value: 5, property: 'field'},
      { value: {}, property: 'field'},
      { value: false, property: 'field'},
    ];

    arrange.forEach(item => {
      assertIsInvalid({ 
        value: item.value, 
        property: item.property, 
        rule: "string", 
        error: new ValidationError("The field must be a string") 
      })
    });

    // valid cases
    arrange = [
      { value: null, property: 'field'},
      { value: undefined, property: 'field'},
      { value: "test", property: 'field'},
    ];

    arrange.forEach(item => {
      assertIsValid({ 
        value: item.value, 
        property: item.property, 
        rule: "string", 
        error: new ValidationError("The field must be a string") 
      })
    });
  })

  test("boolean validation rule", () => {
    // invalid cases
    let arrange: {value: any, property: string}[] = [
      { value: 5, property: 'field'},
      { value: "true", property: 'field'},
      { value: "false", property: 'field'},
    ];

    arrange.forEach(item => {
      assertIsInvalid({ 
        value: item.value, 
        property: item.property, 
        rule: "boolean", 
        error: new ValidationError("The field must be a boolean") 
      })
    });

    // valid cases
    arrange = [
      { value: null, property: 'field'},
      { value: undefined, property: 'field'},
      { value: true, property: 'field'},
      { value: false, property: 'field'}
    ];

    arrange.forEach(item => {
      assertIsValid({ 
        value: item.value, 
        property: item.property, 
        rule: "boolean", 
        error: new ValidationError("The field must be a boolean") 
      })
    });
  })

  test("maxLength validation rule", () => {
    // invalid cases
    let arrange: {value: any, property: string}[] = [
      { value: "aaaaa", property: 'field'},
    ];

    arrange.forEach(item => {
      assertIsInvalid({ 
        value: item.value, 
        property: item.property, 
        rule: "maxLength", 
        error: new ValidationError("The field must be less or equal than 4 characters"),
        params: [4]
      })
    });

    // valid cases
    arrange = [
      { value: null, property: 'field'},
      { value: undefined, property: 'field'},
      { value: "aaaaa", property: 'field'}
    ];

    arrange.forEach(item => {
      assertIsValid({ 
        value: item.value, 
        property: item.property, 
        rule: "maxLength", 
        error: new ValidationError("The field must be less or equal than 5 characters"),
        params: [5]
      })
    });

  })

  it("should throw a validation error when combine two or more validation rules", () => {
    let validator = ValidatorRules.values(null, 'field');
    expect(() => validator.required().string()).toThrow(new ValidationError("The field is required"))

    validator = ValidatorRules.values(5, 'field');
    expect(() => validator.required().string()).toThrow(new ValidationError("The field must be a string"))

    validator = ValidatorRules.values("aaaa", 'field');
    expect(() => validator.required().string().maxLength(2)).toThrow(new ValidationError("The field must be less or equal than 2 characters"))
  })

  it("should validate with combined rules", () => {
    ValidatorRules.values("teste", 'field').required().string();
    ValidatorRules.values("12345", 'field').required().string().maxLength(5);

    ValidatorRules.values(true, 'field').required().boolean();
    ValidatorRules.values(false, 'field').required().boolean();
  })
})