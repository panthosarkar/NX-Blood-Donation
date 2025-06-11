"use client";

import React from 'react'
import ErrorLogsHeader from './ErrorLogsHeader';
import ErrorLogProvider from './context/ErrorLogProvider';
import ErrorLogsTable from './ErrorLogsTable';

const ErrorLogsPage = () => {
    return (
        <ErrorLogProvider>
            <ErrorLogsHeader />
            <ErrorLogsTable />
        </ErrorLogProvider>
    )
}

export default ErrorLogsPage