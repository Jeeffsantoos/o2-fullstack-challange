import { Skeleton, Stack } from '@mui/material'
import React from 'react'

interface SkeletonType {
  width?: string
  height?: string
  count?: number
}

const CustomSkeleton: React.FC<SkeletonType> = ({ width = '55px', height = '35px', count = 1 }) => {
  return (
    <Stack>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rounded"
          animation="wave"
          width={width}
          height={height}
        />
      ))}
    </Stack>
  )
}

export default CustomSkeleton
