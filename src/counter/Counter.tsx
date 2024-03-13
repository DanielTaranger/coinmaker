import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import './Counter.css'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <Box>
      <Button onClick={() => setCount(count+1)}>click me</Button>
    </Box>
  )
}