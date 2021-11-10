import { Heading } from "@chakra-ui/layout"
import type { NextPage } from "next"
import { NextSeo } from "next-seo"

const _404Page: NextPage = () => {
	return (
		<>
			<NextSeo title="404" />
			<Heading as="h3" textAlign="center" fontSize="8xl" mt={20}>
				404
			</Heading>
			<Heading as="h4" textAlign="center" fontWeight={400}>
				There&apos;s nothing here.
			</Heading>
		</>
	)
}

export default _404Page
