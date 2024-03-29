'use client';

import { persistor, store } from '@store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import React from 'react';

export function ReduxProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}
