'use server';

import { signOut } from '@libs/next-auth';

export const signOutAction = async () => {
    await signOut();
};
