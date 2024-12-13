// array-extensions.ts

// Check if the method already exists to avoid overriding
if (Array.prototype.equals === undefined) {
  Object.defineProperty(Array.prototype, 'equals', {
    value: function <T>(this: Array<T>, array: Array<T> | null): boolean {
      // If the other array is a falsy value, return false
      if (!array) return false

      // If the argument is the same array, they are equal
      if (array === this) return true

      // Compare lengths
      if (this.length !== array.length) return false

      for (let i = 0; i < this.length; i++) {
        const a = this[i]
        const b = array[i]

        // Check if both elements are arrays
        if (Array.isArray(a) && Array.isArray(b)) {
          if (!a.equals(b)) return false
        } else {
          // For objects, perform a shallow comparison
          if (a !== b) return false
        }
      }

      return true
    },
    enumerable: false, // Make sure it's not enumerable
  })
}
