import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const TreeLoader = () => {
    return (
        <div className="space-y-4">
            <Skeleton className="h-[400px] w-full" />
            <div className="flex space-x-4">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[100px]" />
            </div>
        </div>
    )
}

export default TreeLoader
