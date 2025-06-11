import { Skeleton } from '@/bikiran/components/ui/skeleton'
import React from 'react'
const BodySkeleton = () => {
    return (
        <div
            className={`border border-[#E0C1FF] flex justify-between gap-[15px] rounded-[13px] px-2.5 py-5`}
        >
            <div className='flex gap-[15px]'>
                <Skeleton className="size-7" />
                <div className="flex flex-col gap-1">
                    <Skeleton className="w-[256px] h-[28px]" />
                    <Skeleton className="w-[256px] h-[16px]" />
                </div>
            </div>
            <div className="flex flex-col items-end gap-1">
                <Skeleton className="w-[60px] h-[28px]" />
                <Skeleton className="w-[60px] h-[16px]" />
            </div>
        </div>
    )
}

const ModalRenewSkeletonComp = () => {

    return (
        <>
            <BodySkeleton />
            <h2 className="text-primary font-medium mt-2.5 mb-2">
                <Skeleton className="w-[100px] h-[16px]" />
            </h2>
            <BodySkeleton />
            <div className="flex items-center justify-end gap-2 text-primary text-base font-medium mt-4 mb-5">
                <span><Skeleton className="w-[60px] h-[16px]" /></span>{" "}
                <span><Skeleton className="w-[60px] h-[16px]" /></span>
            </div>
            <div className="flex justify-end">
                <Skeleton className="w-[118px] h-[45px]" />
            </div>
        </>
    )
}

export default ModalRenewSkeletonComp