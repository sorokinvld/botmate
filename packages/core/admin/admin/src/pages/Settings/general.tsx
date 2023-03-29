import {
  Container,
  Heading,
  HStack,
  Spacer,
  Switch,
  RadioButton,
  useColorMode,
  Box,
  Text,
} from '@botmate/ui';

function SettingsGeneralPage() {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <Container maxW="4xl" py={6}>
      <HStack>
        <Box>
          <Heading size="sm">Theme Prefrence</Heading>
          <Text color="GrayText">
            Choose between light and dark color mode. You can also choose to
          </Text>
        </Box>
        <Spacer />
        <RadioButton
          activeIndex={colorMode === 'light' ? 0 : 1}
          options={[
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
          ]}
          onChange={(value) => {
            setColorMode(value);
          }}
        />
      </HStack>
    </Container>
  );
}

export default SettingsGeneralPage;
