/**
 * 获取对象的属性
 * @param object 对象
 * @param path 属性路径
 * @param defaultValue 默认值
 * @returns 属性值
 */
export function get(object: Record<string, any> | undefined, path: (string | number)[] | string, defaultValue?: any): any {
  if (typeof path === 'string') {
    path = path.split('.').map((key) => {
      const numKey = Number(key)
      return Number.isNaN(numKey) ? key : numKey
    })
  }

  let result: any = object

  for (const key of path) {
    if (result === undefined || result === null) {
      return defaultValue
    }

    result = result[key]
  }

  return result !== undefined ? result : defaultValue
}

/**
 * 从对象中选择指定的属性
 * @param data 对象
 * @param keys 属性列表
 * @returns 选择后的对象
 */
export function pick<Data extends object, Keys extends keyof Data>(data: Data, keys: Keys[]): Pick<Data, Keys> {
  const result = {} as Pick<Data, Keys>

  for (const key of keys) {
    result[key] = data[key]
  }

  return result
}
