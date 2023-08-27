import '@/app/styles/globals.css'
import type {AppProps} from 'next/app'
import {trpc} from "@/shared/utils/trpc";
import {SessionProvider, useSession} from "next-auth/react";
import {FC, ReactElement, ReactNode, useEffect, useState} from "react";
import {NextPage} from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const App: FC<AppPropsWithLayout> = ({Component, pageProps}) => {
    const getLayout = Component.getLayout ?? ((page) => page)

    return (
        <SessionProvider session={pageProps.session}>
            {getLayout(<Component {...pageProps} />)}
        </SessionProvider>)

};

export default trpc.withTRPC(App);

