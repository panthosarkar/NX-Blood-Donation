"use client"
import React from 'react'
import { SIZE_MD, useLayout } from '@/bik-lib/context/LayoutProvider'
import SupportAdminTableHeaderMobComp from './layouts/mobile-layouts/SupportAdminTableHeaderMobComp';
import SupportAdminTableMobileComp from './layouts/mobile-layouts/SupportAdminTableMobileComp';
import SupportAdminTableHeaderWebComp from './layouts/web-layouts/SupportAdminTableHeaderWebComp';
import SupportAdminTableWebComp from './layouts/web-layouts/SupportAdminTableWebComp';



const SupportAdminTableSection = () => {
    const { windowWidth } = useLayout();

    const isMobile = windowWidth <= SIZE_MD;
    return isMobile ? (
        <div className='flex flex-col gap-[15px]'>
            <SupportAdminTableHeaderMobComp />
            <SupportAdminTableMobileComp />
        </div>
    ) : (
        < div className='flex flex-col gap-[15px] admin-section' >
            <SupportAdminTableHeaderWebComp />
            <SupportAdminTableWebComp />
        </div>
    )
}

export default SupportAdminTableSection;