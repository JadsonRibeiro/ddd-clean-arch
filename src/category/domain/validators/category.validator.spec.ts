import CategoryValidatorFactory, { CategoryRules, CategoryValidator } from "./category.validators"

describe("CategoryValidator tests", () => {
  let validator: CategoryValidator;

  beforeEach(() => validator = CategoryValidatorFactory.create());

  test("Invalidation cases for name field", () => {
    expect({ validator, data: null }).containsErrorMessages({
      name: [
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters'
      ]
    });

    expect({ validator, data: { name: "" } }).containsErrorMessages({
      name: [
        'name should not be empty'
      ]
    });

    expect({ validator, data: { name: 5 as any } }).containsErrorMessages({
      name: [
        'name must be a string',
        'name must be shorter than or equal to 255 characters'
      ]
    });

    expect({ validator, data: { name: 't'.repeat(256) } }).containsErrorMessages({
      name: [
        'name must be shorter than or equal to 255 characters'
      ]
    });
  })

  test("valid cases", () => {
    const arrange: {name: string, description?: string, is_active?: boolean}[] = [
      { name: "some value" },
      { name: "some value", description: null },
      { name: "some value", description: undefined },
      { name: "some value", is_active: true },
      { name: "some value", is_active: false }
    ]

    arrange.forEach(item => {
      const isValid = validator.validate(item);
      expect(isValid).toBeTruthy();
      expect(validator.validatedData).toStrictEqual(new CategoryRules(item));
    });
  })
})