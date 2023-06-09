import { useState } from 'react';
import { Center, HStack, Spinner, Text, useColorModeValue } from '@chakra-ui/react';

type Option = {
  label: string;
  value: string;
  color?: string;
};
type RadioButtonProps = {
  options: Option[];
  onChange?(value: string): void;
  isLoading?: boolean;
  activeIndex?: number;
};
function RadioButton({ options, onChange, isLoading, activeIndex: active }: RadioButtonProps) {
  const [activeIndex, setActiveIndex] = useState(active ?? 0);
  const bg = useColorModeValue('gray.200', '#232332');
  const color = useColorModeValue('gray.500', 'gray.400');
  const borderColor = useColorModeValue('blackAlpha.400', 'gray.700');

  return (
    <HStack spacing={0} userSelect="none">
      {options.map((option, index) => {
        const loading = isLoading && index === activeIndex;
        const isActive = index === activeIndex;
        return (
          <Center
            py={1}
            px={3}
            key={index}
            height="35px"
            bg={index === activeIndex ? bg : 'transparent'}
            cursor="pointer"
            borderTopWidth="1px"
            borderBottomWidth="1px"
            borderRightWidth="1px"
            borderColor={borderColor}
            color={isActive ? color : ''}
            borderLeftWidth={index === 0 ? '1px' : '0px'}
            borderRightRadius={index === options.length - 1 ? 'md' : 'none'}
            borderLeftRadius={index === 0 ? 'md' : 'none'}
            onClick={() => {
              if (loading) return;
              if (index === activeIndex) return;
              setActiveIndex(index);
              onChange?.(option.value);
            }}
            transition="all 0.2s ease"
            position="relative"
          >
            <Text opacity={loading ? 0 : index === activeIndex ? 1 : 0.5}>{option.label}</Text>
            {loading ? <Spinner position="absolute" size="sm" /> : null}
          </Center>
        );
      })}
    </HStack>
  );
}

export { RadioButton };
