import React from 'react';
import { DashboardLayout } from '@/layouts/dashboard';
import { RadioButton } from '@/libs/ui';
import {
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Kbd,
  Spacer,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

function Marketplace() {
  return <div>Marketplace</div>;
}

Marketplace.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    title="Marketplace"
    action={
      <>
        <InputGroup w="72">
          <InputLeftElement>
            <FiSearch />
          </InputLeftElement>
          <Input placeholder="Search" />
          <InputRightElement>
            <Kbd>/</Kbd>
          </InputRightElement>
        </InputGroup>
        <Spacer />
        <RadioButton options={['All', 'Free', 'Paid']} />
      </>
    }
  >
    {page}
  </DashboardLayout>
);

export default Marketplace;
