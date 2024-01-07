'use server';

import { cookies } from 'next/headers';

export async function createCookie(name: string, data: string) {
    cookies().set(name, data);
    console.log(name);
}
