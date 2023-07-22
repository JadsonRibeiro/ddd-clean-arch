import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import { Category, CategoryProps } from "./category"

describe("category tests", () => {
  beforeEach(() => {
    Category.validate = jest.fn();
  });

  test("constructor category", () => {
    // tripe A = Arrange, Act and Assert

    // Arrange
    const props = {name: 'Movie', description: 'some movie', is_active: true};

    // Act
    let category = new Category(props);

    expect(Category.validate).toHaveBeenCalled();

    expect(category.props).toStrictEqual(props);
    expect(category.props.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: "Movie",
      description: "Some movie",
      is_active: false,
      created_at
    });
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "Some movie",
      is_active: false,
      created_at
    });

    category = new Category({
      name: "Movie",
      description: "Other description"
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      description: "Other description"
    });

    category = new Category({
      name: "Movie",
      is_active: true
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: true
    });

    created_at = new Date();

    category = new Category({
      name: "Movie",
      created_at
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      created_at
    });
  });

  test("getters and setters of category", () => {
    let category = new Category({
      name: "Movie"
    });
    expect(category.description).toBeNull();

    category = new Category({
      name: "Movie",
      description: "Some description"
    });
    expect(category.description).toBe("Some description");

    category = new Category({
      name: "Moview"
    });

    category['description'] = "Other description";
    expect(category.description).toBe("Other description");

    category['description'] = undefined;
    expect(category.description).toBeNull();

    category['description'] = null;
    expect(category.description).toBeNull();
  });

  test("getter and setter of is_active prop", () => {
    let category = new Category({
      name: "Moview"
    });
    expect(category.is_active).toBeTruthy();

    category = new Category({
      name: "Moview",
      is_active: true
    });
    expect(category.is_active).toBeTruthy();

    category = new Category({
      name: "Moview",
      is_active: false
    });
    expect(category.is_active).toBeFalsy();
  });

  test("getter and setter of created_at prop", () => {
    let category = new Category({
      name: "Moview"
    });
    expect(category.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: "Moview",
      created_at
    });
    expect(category.created_at).toBe(created_at);
  });

  test("getter and setter of name property", () => {
    let category = new Category({ name: "Moview" });

    category["name"] = "other name"

    expect(category.name).toBe("other name");
  })

  test("id field", () => {
    type CategoryData = {
      props: CategoryProps,
      id?: UniqueEntityId;
    }

    const data: CategoryData[] = [
      { props: { name: "Moview" } },
      { props: { name: "Moview" }, id: null },
      { props: { name: "Moview" }, id: undefined },
      { props: { name: "Moview" }, id: new UniqueEntityId() },
    ]

    data.forEach((i) => {
      const category = new Category(i.props, i.id);
      expect(category.id).not.toBeNull();
      expect(category.entityUniqueId).toBeInstanceOf(UniqueEntityId);
    })
  });

  test("update method", () => {
    let category = new Category({ name: "Movie", description: "Description" });
    category.update("New name", "New description");
    expect(Category.validate).toHaveBeenCalledTimes(2);
    expect(category.name).toBe("New name");
    expect(category.description).toBe("New description");
  });

  test("activate method", () => {
    const category = new Category({ name: "Movie", description: "Description", is_active: false });
    category.activate();
    expect(category.is_active).toBeTruthy();
  });

  test("deactivate method", () => {
    const category = new Category({ name: "Movie", description: "Description", is_active: true });
    category.deactivate();
    expect(category.is_active).toBeFalsy();
  });
})