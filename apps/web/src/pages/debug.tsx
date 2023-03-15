import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@layouts';
import { useSocketIO } from '@providers';
import dynamic from 'next/dynamic';
import {
  FormControl,
  FormLabel,
  GridItem,
  Select,
  SimpleGrid,
} from '@chakra-ui/react';
import { ThemeKeys } from 'react-json-view';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });
const themes = [
  'apathy',
  'apathy:inverted',
  'ashes',
  'bespin',
  'brewer',
  'bright:inverted',
  'bright',
  'chalk',
  'codeschool',
  'colors',
  'eighties',
  'embers',
  'flat',
  'google',
  'grayscale',
  'grayscale:inverted',
  'greenscreen',
  'harmonic',
  'hopscotch',
  'isotope',
  'marrakesh',
  'mocha',
  'monokai',
  'ocean',
  'paraiso',
  'pop',
  'railscasts',
  'rjv-default',
  'shapeshifter',
  'shapeshifter:inverted',
  'solarized',
  'summerfruit',
  'summerfruit:inverted',
  'threezerotwofour',
  'tomorrow',
  'tube',
  'twilight',
];

function Debug() {
  const { socket } = useSocketIO();
  const [data, setData] = useState({});
  const [theme, setTheme] = useState<ThemeKeys>('tomorrow');

  useEffect(() => {
    socket.on('bot:message', (data) => {
      setData(data);
    });

    return () => {
      socket.off('bot:message');
    };
  }, [socket]);
  return (
    <SimpleGrid columns={10} h="full">
      <GridItem
        h="full"
        colSpan={{
          base: 10,
          lg: 7,
        }}
        p={4}
        borderRightWidth="1px"
      >
        <ReactJson src={data} theme={theme} />
      </GridItem>

      <GridItem
        h="full"
        colSpan={{
          base: 10,
          lg: 3,
        }}
        p={4}
      >
        <FormControl>
          <FormLabel>Viewer Theme</FormLabel>
          <Select
            onChange={(v) => {
              setTheme(v.target.value as ThemeKeys);
            }}
          >
            {themes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </Select>
        </FormControl>
      </GridItem>
    </SimpleGrid>
  );
}

Debug.getLayout = (page: React.ReactElement) => (
  <DashboardLayout noPadding title="Bot Debug">
    {page}
  </DashboardLayout>
);

export default Debug;
