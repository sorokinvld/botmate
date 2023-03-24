import { x, SystemProps } from '@xstyled/styled-components';

type BotProps = {
	children: React.ReactNode;
} & SystemProps;
function Box({ children, ...rest }: BotProps) {
	return <x.div {...rest}>{children}</x.div>;
}

export { Box };
