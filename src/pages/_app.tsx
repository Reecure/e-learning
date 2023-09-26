import type {AppProps} from "next/app";
import {trpc} from "@/shared/utils/trpc";
import {SessionProvider} from "next-auth/react";
import {type FC, type ReactElement, type ReactNode} from "react";
import {type NextPage} from "next";
import {ReduxProvider} from "@/app/ReduxProvider";
import "../app/styles/globals.css";

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const App: FC<AppPropsWithLayout> = ({Component, pageProps}) => {
	const getLayout = Component.getLayout ?? (page => page);

	return (
		<ReduxProvider>
			<SessionProvider session={pageProps.session}>
				{getLayout(<Component {...pageProps} />)}
			</SessionProvider>
		</ReduxProvider>
	);
};

export default trpc.withTRPC(App);
