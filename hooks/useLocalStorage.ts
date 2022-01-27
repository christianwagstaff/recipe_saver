export const getLocalStorage = (key: string) => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}

export const setLocalStorage = (key: string, value: any) => {
  const stringData = JSON.stringify(value)
  localStorage.setItem(key, stringData)
}
