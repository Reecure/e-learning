
import { Inter } from 'next/font/google'
import {trpc} from "@/shared/utils/trpc";
import Link from "next/link";
import {useEffect} from "react";
import {useSession} from "next-auth/react";


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <main>
            sign in
        </main>
    )
}
