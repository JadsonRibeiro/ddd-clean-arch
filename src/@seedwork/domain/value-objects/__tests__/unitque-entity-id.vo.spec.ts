import { validate as uuidValidate } from 'uuid';

import InvalidUuidError from "../../errors/invalid-uuid.error"
import UniqueEntityId from "../unique-entity-id.vo"

describe("UnitqueEntityId Units Tests", () => {
  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

  it("should throw error when uuid is invalid", () => {
    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const uuid = "4f28b379-c5b2-44df-9c40-1ef3bd214c13";
    const vo = new UniqueEntityId(uuid);
    expect(vo.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should generate a valid uuid when nothing is passed in constructor", () => {
    const vo = new UniqueEntityId();
    expect(uuidValidate(vo.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
})