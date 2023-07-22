import { ValidationError } from "../../../@seedwork/domain/errors/validation.error"
import { Category } from "./category"

describe("Category integration tests", () => {
  describe("create method", () => {
    it("should throw invalid error when instanciate a invalid name", () => {
      expect(() => new Category({ name: null })).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      });

      expect(() => new Category({ name: "" })).containsErrorMessages({
        name: [
          'name should not be empty'
        ]
      });

      expect(() => new Category({ name: 5 as any })).containsErrorMessages({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      });

      expect(() => new Category({ name: "a".repeat(256) })).containsErrorMessages({
        name: [
          'name must be shorter than or equal to 255 characters'
        ]
      }); 
    })
    
    it("should throw invalid error when instanciate a invalid description", () => {
      expect(() => new Category({ name: "Movie", description: 5 as any })).containsErrorMessages({
        description: [
          'description must be a string'
        ]
      });
    })

    it("should throw invalid error when instanciate a invalid is_active", () => {
      expect(() => new Category({ name: "Movie", is_active: 5 as any })).containsErrorMessages({
        is_active: [
          'is_active must be a boolean value'
        ]
      });
    })

    it("should create a category when using valid properties", () => {
      expect.assertions(0);
      new Category({ name: "Movie" });
      new Category({ name: "Movie", description: "Description" });
      new Category({ name: "Movie", description: null });
      new Category({ name: "Movie", description: "Description", is_active: false });
      new Category({ name: "Movie", description: "Description", is_active: true });
    })
  })

  describe("update method", () => {
    it("should throw invalid error when update with invalid name", () => {
      const category = new Category({ name: "Movie" });

      expect(() => category.update(null, null)).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      });
  
      expect(() => category.update("", null)).containsErrorMessages({
        name: [
          'name should not be empty'
        ]
      });
  
      expect(() => category.update(5 as any, null)).containsErrorMessages({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      });
  
      expect(() => category.update("a".repeat(256), null)).containsErrorMessages({
        name: [
          'name must be shorter than or equal to 255 characters'
        ]
      });
    })
    
    it("should throw invalid error when update with invalid description", () => {
      const category = new Category({ name: "Movie" });

      expect(() => category.update("Teste", 5 as any)).containsErrorMessages({
        description: [
          'description must be a string'
        ]
      });
    })

    it("should allow update category when using valid values", () => {
      expect.assertions(0);
      
      const category = new Category({ name: "Movie" });
      category.update("new name", null)
      category.update("new name", "some description");
    })
  })
})