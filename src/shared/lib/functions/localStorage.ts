import { UIStateSchema, DataSchema } from '../../../app/providers/StoreProvider/types/StateSchema';

export enum LocalStorageKeys {
  UI = 'kanban/ui',
  boards = 'kanban/boards',
}
/**
 * @todo
 * Refactor: use LocalStorageKeys as keys to interface
 */
interface LocalStorageKeysMap {
  'kanban/ui': UIStateSchema;
  'kanban/boards': DataSchema['boards'];
}

export const saveToLocalStorage = <K extends keyof LocalStorageKeysMap>(key: K, data: LocalStorageKeysMap[K]) => {
  const json = JSON.stringify(data);
  localStorage.setItem(key, json);
};

// export const loadFromLocalStorage = <T>(key: LocalStorageKeys) => {
//   const data = JSON.parse(localStorage.getItem(key) || '') as T;
//   return data;
// };

export const loadFromLocalStorage = <K extends keyof LocalStorageKeysMap>(key: K): LocalStorageKeysMap[K] => {
  return JSON.parse(localStorage.getItem(key)!) as LocalStorageKeysMap[K];
};

// const uI = lsFunc(LocalStorageKeys.data);
