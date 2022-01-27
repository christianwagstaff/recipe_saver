import { useState, useEffect } from 'react'

function useWidowWidth(width: number) {
  // Initilize state with undefined
  console.log(width)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    // Set is Mobile on initial render
    // Use event listeners to future resizing of screen
    function handleScreenResize() {
      if (window.innerWidth < 600) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }
    handleScreenResize() // Call handler right away so state updates
    window.addEventListener('resize', handleScreenResize)
    return () => window.removeEventListener('resize', handleScreenResize)
  }, [])
  return isMobile
}

export default useWidowWidth
