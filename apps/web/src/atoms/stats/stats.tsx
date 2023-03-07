import { motion } from 'framer-motion';
import {
  Box,
  Heading,
  HStack,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

type StatsProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  label?: string;
  index?: number;
};
function Stats({ title, value, icon, label, index }: StatsProps) {
  const bg = useColorModeValue('secondary.light', 'secondary.dark');

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: index ? index * 0.1 : 0,
      }}
    >
      <Box p={4} bg={bg} rounded="md" borderWidth="1px">
        <HStack alignItems="flex-start">
          <Stack>
            <Text size="md">{title}</Text>
            <Heading>{value}</Heading>
          </Stack>
          <Spacer />
          <Box rounded="xl" fontSize="6xl">
            {icon}
          </Box>
        </HStack>
        <Text mt={2} fontSize={12} opacity={0.8}>
          {label}
        </Text>
      </Box>
    </motion.div>
  );
}

export { Stats };
