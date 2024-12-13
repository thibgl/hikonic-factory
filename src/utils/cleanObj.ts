export function cleanObject(obj: any): any {
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
      delete obj[key]
    } else if (typeof obj[key] === 'object') {
      // Recursively clean nested objects
      cleanObject(obj[key])

      // If the nested object is empty after cleaning, remove it
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key]
      }
    }
  }

  return obj
}
