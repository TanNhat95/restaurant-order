'use client'

import Link from "next/link";
import { useSession, signOut } from 'next-auth/react'

const UserLinks = () => {
    const { data, status} = useSession()

    return (
        <>
        { status === 'authenticated' ? (
            <>
                <Link href="/orders">Orders</Link>
                <span className="cursor-pointer" onClick={() => signOut()}>Logout</span>
            </>
        ) : (
            <Link href="/login">Login</Link>
        )}
        </>
    );
}

export default UserLinks;