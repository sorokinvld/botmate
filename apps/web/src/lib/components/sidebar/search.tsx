import {
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Kbd,
} from '@chakra-ui/react';
import { FiSearch, FiSlack } from 'react-icons/fi';

type SearchProps = {};

function Search(props: SearchProps) {
	return (
		<InputGroup>
			<InputLeftElement>
				<FiSearch />
			</InputLeftElement>
			<Input placeholder='Search' />
			<InputRightElement>
				<Kbd>/</Kbd>
			</InputRightElement>
		</InputGroup>
	);
}

export { Search };
