import { useState } from 'react';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import darkTheme from '../themes/darkTheme';

import { ThemeContext } from '../Contexts/Theme';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(darkTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
