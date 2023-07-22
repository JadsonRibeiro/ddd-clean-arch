import * as expectFuncions from "expect";

import ClassValidatorFields from "../validators/class-validator-fields";
import { FieldsErrors } from "../validators/validator-fields-interface";
import { EntityValidationError } from "../errors/validation.error";

type Expect = { 
  validator: ClassValidatorFields<any>;
  data: any
} | (() => any);

expect.extend({
  containsErrorMessages(expect: Expect, received: FieldsErrors) {
    if(typeof expect === "function") {
      try {
        expect();
        return {
          pass: false,
          message: () => "The data is valid"
        }
      } catch (e) {
        const error = e as EntityValidationError;
        return checkAssertionErrorMessages(error.error, received);
      }
    } else {
      const { validator, data } = expect;
      const isValid = validator.validate(data);
  
      if(isValid) {
        return {
          pass: false,
          message: () => "The data is valid"
        }
      }
  
      return checkAssertionErrorMessages(validator.errors, received);
    }
  }
})

function checkAssertionErrorMessages(errors: FieldsErrors, received: FieldsErrors) {
  const isMatch = expectFuncions.expect.objectContaining(received).asymmetricMatch(errors);
  
  return isMatch 
    ? { pass: true, message: () => "" }
    : { 
      pass: false, 
      message: () => 
      `The validation errors not contains ${JSON.stringify(received)}. Current: ${JSON.stringify(errors)}` 
    }
}