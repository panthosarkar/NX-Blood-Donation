"use client";

import React from 'react'
import UserActivityProvider from './context/UnlocatedActivityProvider'
import UserActivityLogsTable from './UnlocatedActivityLogsTable';
import UserActivityLogsHeader from './UnlocatedActivityLogsHeader';
const UnlocatedActivityLogsPage = () => {
    return (
        <UserActivityProvider>
            <UserActivityLogsHeader />
            <UserActivityLogsTable />
        </UserActivityProvider>
    )
}

export default UnlocatedActivityLogsPage