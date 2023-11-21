import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from '@components/Common/Home/HomePage';

export default async function Home() {
    return (
        <>
            <ToastContainer />
            <HomePage />
        </>
    );
}
