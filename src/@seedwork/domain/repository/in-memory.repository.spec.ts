import Entity from "../entity/entity";
import NotFoundError from "../errors/not-found.error";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import { InMemoryRepository } from "./in-memory.repository";

type StubEntityProps = {
  name: string;
  price: number;
}

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe("InMemoryRepository unit tests", () => {
  let repository: StubInMemoryRepository;

  beforeEach(() => repository = new StubInMemoryRepository());

  it("should inserts a new entity", async () => {
    const entity = new StubEntity({ name: 'some value', price: 5 });
    await repository.insert(entity);
    expect(repository.items[0].toJSON()).toStrictEqual(entity.toJSON());
  })

  it("should throw an error when entity isnt found", () => {
    expect(repository.findById('fake id')).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    )

    expect(repository.findById(new UniqueEntityId('4f28b379-c5b2-44df-9c40-1ef3bd214c13'))).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID 4f28b379-c5b2-44df-9c40-1ef3bd214c13`)
    )
  })

  it("should finds a entity by id", async () => {
    const entity = new StubEntity({ name: 'some value', price: 5 });
    await repository.insert(entity);

    let foundEntity = await repository.findById(entity.id);
    expect(foundEntity.toJSON()).toStrictEqual(entity.toJSON());

    foundEntity = await repository.findById(entity.entityUniqueId);
    expect(foundEntity.toJSON()).toStrictEqual(entity.toJSON());
  })

  it("should finds all entities", async () => {
    const entity = new StubEntity({ name: 'some value', price: 5 });
    await repository.insert(entity);

    const entities = await repository.findAll();
    expect(entities).toStrictEqual([entity]);
  })

  it("should throw an error when update an entity thant doesnt exists", () => {
    const entity = new StubEntity({ name: 'some value', price: 5 });
    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID ${entity.id}`)
    );
  })

  it("should update an entity", async () => {
    const entity = new StubEntity({ name: 'some value', price: 5 });
    await repository.insert(entity);

    const updatedEntity = new StubEntity({ name: 'new name', price: 1 }, entity.entityUniqueId);
    await repository.update(updatedEntity);

    expect(updatedEntity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  })

  it("should throw an error when delete an entity that doesnt exists", () => {
    expect(repository.delete('fake id')).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    )

    expect(repository.delete(new UniqueEntityId('4f28b379-c5b2-44df-9c40-1ef3bd214c13'))).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID 4f28b379-c5b2-44df-9c40-1ef3bd214c13`)
    )
  })

  it("should deletes an entity", async () => {
    const entity = new StubEntity({ name: 'some value', price: 5 });
    await repository.insert(entity);

    await repository.delete(entity.id);
    expect(repository.items).toHaveLength(0);

    await repository.insert(entity);

    await repository.delete(entity.entityUniqueId);
    expect(repository.items).toHaveLength(0);
  })
})