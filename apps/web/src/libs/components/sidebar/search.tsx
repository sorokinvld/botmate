import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Kbd,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

type SearchProps = {
  w?: string;
};

function Search({ w = 'full' }: SearchProps) {
  return (
    <InputGroup w={w}>
      <InputLeftElement>
        <FiSearch />
      </InputLeftElement>
      <Input placeholder="Search" />
      <InputRightElement>
        <Kbd>/</Kbd>
      </InputRightElement>
    </InputGroup>
  );
}

export { Search };
