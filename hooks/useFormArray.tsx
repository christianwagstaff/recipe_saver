import { useState, FormEvent } from 'react'

interface Errors {
  [key: string]: any
}

interface ArrayObject {
  [key: string]: any
  errors?: Errors
}

const useFormArray = ({ itemTemplate }: { itemTemplate: object }) => {
  const [items, setItems] = useState<ArrayObject[]>([])

  const handleRemoveItem = (e: FormEvent, index: number) => {
    e.preventDefault()
    // Remove item based on index
    setItems((prev) => prev.filter((item) => item !== prev[index]))
  }

  const prevIsValid = () => {
    if (items.length === 0) {
      return true
    }
    // Get last item to check value
    const lastItem = items[items.length - 1]

    let someEmpty = false

    // Loop through item to check for empty
    for (const [key, value] of Object.entries(lastItem)) {
      if (value === '') {
        someEmpty = true
        // If user uses Errors then assign error handling
        if (lastItem.errors) {
          if (lastItem.errors.key) {
            console.log(lastItem)
            lastItem.errors.key = `${key} is required`
          }
        }
      }
    }

    return !someEmpty
  }

  const handleAddItem = (e: FormEvent) => {
    e.preventDefault()
    const newItemState = itemTemplate
    if (prevIsValid()) {
      setItems([...items, newItemState])
    }
  }

  const handleItemChange = (e: any, index: number) => {
    e.preventDefault()
    setItems((prev) =>
      prev.map((item, i) => {
        if (i !== index) {
          return item
        } else {
          return {
            ...item,
            [e.target.name]: e.target.value,

            // Clear Errors when user inputs
            errors: {
              ...item.errors,
              [e.target.name]:
                e.target.value.length > 0
                  ? null
                  : `${e.target.name} is required`,
            },
          }
        }
      })
    )
  }
  return [items, handleAddItem, handleItemChange, handleRemoveItem] as const
}

export default useFormArray
