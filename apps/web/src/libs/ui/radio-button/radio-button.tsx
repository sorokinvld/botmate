import { useEffect, useState } from 'react';
import {
  Center,
  HStack,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

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
function RadioButton({
  options,
  onChange,
  isLoading,
  activeIndex: active,
}: RadioButtonProps) {
  const [activeIndex, setActiveIndex] = useState(active ?? 0);
  const bg = useColorModeValue('secondary.light', '#232332');

  // useEffect(() => {
  //   onChange?.(options[activeIndex].value);
  // }, [onChange, activeIndex, options]);

  return (
    <HStack spacing={0} userSelect="none">
      {options.map((option, index) => {
        const loading = isLoading && index === activeIndex;
        return (
          <Center
            py={1}
            px={3}
            key={index}
            height="35px"
            bg={index === activeIndex ? option.color ?? bg : 'transparent'}
            cursor="pointer"
            borderTopWidth="1px"
            borderBottomWidth="1px"
            borderRightWidth="1px"
            borderLeftWidth={index === 0 ? '1px' : '0px'}
            borderRightRadius={index === options.length - 1 ? 'md' : 'none'}
            borderLeftRadius={index === 0 ? 'md' : 'none'}
            onClick={() => {
              setActiveIndex(index);
              onChange?.(option.value);
            }}
            transition="all 0.2s ease"
            position="relative"
          >
            <Text opacity={loading ? 0 : 1}>{option.label}</Text>

            {loading ? <Spinner position="absolute" size="sm" /> : null}
          </Center>
        );
      })}
    </HStack>
  );
}

export { RadioButton };
