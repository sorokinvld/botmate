import { Box, HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type SidebarItemProps = {
	icon: React.ReactNode;
	label: string;
	href: string;
};
function SidebarItem({
	//
	icon,
	label,
	href,
}: SidebarItemProps) {
	const r = useRouter();
	const active =
		href === '/' ? href === r.pathname : r.pathname.startsWith(href);

	return (
		<Link href={href}>
			<HStack
				px={3}
				py={1.5}
				opacity={active ? 1 : 0.6}
				bg={active ? '#272832' : 'transparent'}
				borderWidth='1px'
				borderColor={active ? '#ffffff29' : 'transparent'}
				rounded='md'
				userSelect='none'
				cursor='pointer'
				transition='all 0.2s'
				_hover={{
					opacity: active ? 1 : 0.8,
				}}
			>
				<Box fontSize='lg'>{icon}</Box>
				<Text>{label}</Text>
			</HStack>
		</Link>
	);
}

export { SidebarItem };
