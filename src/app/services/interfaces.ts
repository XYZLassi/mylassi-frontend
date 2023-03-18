export enum ItemDataSource {
  State = 1,
  Session,
  Local,
  Cache,
  API = 5,
}

export interface ItemTransferState<Model> {
  item: Model;
  source: ItemDataSource
}
