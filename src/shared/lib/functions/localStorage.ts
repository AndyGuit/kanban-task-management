export enum LocalStorageKeys {
  UI = 'kanban/ui',
  data = 'kanban/data',
}

export const saveToLocalStorage = <T>(key: LocalStorageKeys, data: T) => {
  const json = JSON.stringify(data);
  localStorage.setItem(key, json);
};

export const loadFromLocalStorage = <T>(key: LocalStorageKeys) => {
  const data = JSON.parse(localStorage.getItem(key) || '') as T;
  return data;
};
