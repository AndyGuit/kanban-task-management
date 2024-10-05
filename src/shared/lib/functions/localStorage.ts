import { UIStateSchema, DataSchema } from '../../../app/providers/StoreProvider/types/StateSchema';
import { AppTheme } from '../../types/appThemes';

export enum LocalStorageKeys {
  UI = 'kanban/ui',
  boards = 'kanban/boards',
  Theme = 'kanban/theme',
}
/**
 * @todo
 * Refactor: use LocalStorageKeys as keys to interface
 */
interface LocalStorageKeysMap {
  'kanban/ui': UIStateSchema;
  'kanban/boards': DataSchema['boards'];
  'kanban/theme': AppTheme;
}

export const saveToLocalStorage = <K extends keyof LocalStorageKeysMap>(key: K, data: LocalStorageKeysMap[K]) => {
  const json = JSON.stringify(data);
  localStorage.setItem(key, json);
};

export const loadFromLocalStorage = <K extends keyof LocalStorageKeysMap>(key: K): LocalStorageKeysMap[K] => {
  return JSON.parse(localStorage.getItem(key)!) as LocalStorageKeysMap[K];
};
