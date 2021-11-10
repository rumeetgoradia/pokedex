import { IconButton } from "@chakra-ui/button"
import { Box, Flex, Text } from "@chakra-ui/layout"
import { PokeBallIcon } from "@components/PokeBallIcon"
import { createTransition } from "@utils"
import { useRouter } from "next/dist/client/router"
import NextLink from "next/link"
import { IoHomeSharp } from "react-icons/io5"

const Header: React.FC = () => {
	const router = useRouter()

	return (
		<Flex
			justify="space-between"
			as="header"
			w="full"
			mb={4}
			py={4}
			borderBottom="1px"
			align="flex-end"
			borderBottomColor={router.pathname === "/" ? "transparent" : "gray.200"}
		>
			<Flex
				align="center"
				justify={router.pathname === "/" ? "center" : "flex-start"}
				flex="1"
			>
				<PokeBallIcon h={{ base: "60px", sm: "80px" }} w="auto" />
				<Text
					as="h1"
					fontSize={{ base: "5xl", sm: "7xl" }}
					fontWeight="black"
					display="inline-block"
					mb={2}
					ml={2}
					lineHeight={1}
				>
					<Box as="span" color="brand" cursor="pointer">
						<NextLink href="https://rumeetgoradia.com">rg</NextLink>
					</Box>
					Pokedex
				</Text>
			</Flex>
			<Box display={router.pathname === "/" ? "none" : "block"}>
				<NextLink href="/" passHref>
					<IconButton
						as="a"
						fontSize="2xl"
						w="auto"
						h="auto"
						bg="none"
						icon={<IoHomeSharp />}
						aria-label="Return to home"
						title="Return to home"
						mb={3}
						borderRadius="50%"
						opacity={0.75}
						transition={createTransition(["opacity", "transform"])}
						_hover={{
							opacity: 1,
						}}
						_focus={{
							opacity: 1,
						}}
						_active={{
							transform: "scale(0.95)",
						}}
					/>
				</NextLink>
			</Box>
		</Flex>
	)
}

export default Header
