import { Container } from "@chakra-ui/layout"
import { Chakra } from "@components/Chakra"
import { Header } from "@components/Header"
import theme, { Fonts } from "@theme"
import { DefaultSeo } from "next-seo"
import SeoProps from "next-seo.config"
import type { AppProps } from "next/app"

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<DefaultSeo {...SeoProps} />
			<Chakra cookies={pageProps.cookies} theme={theme}>
				<Fonts />
				<Container maxW="container.md">
					<Header />

					<Component {...pageProps} />
				</Container>
			</Chakra>
		</>
	)
}

export { getServerSideProps } from "@components/Chakra"
