import UniqueEntityId from "../value-objects/unique-entity-id.vo";

export default abstract class Entity<Props = any> {
  public readonly entityUniqueId: UniqueEntityId;

  constructor(public readonly props: Props, id?: UniqueEntityId) {
    this.entityUniqueId = id || new UniqueEntityId();
  }

  get id() {
    return this.entityUniqueId.value;
  }

  toJSON(): Required<{id: string} & Props> {
    return {
      id: this.id,
      ...this.props
    } as Required<{id: string} & Props>
  }
}