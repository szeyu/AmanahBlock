import { extendTheme } from '@chakra-ui/react';

// Define a rich theme with Islamic-inspired elements and Web3 aesthetics
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#0A0F1E',
        color: 'white',
        backgroundImage: 
          'radial-gradient(circle at 25% 10%, rgba(128, 90, 213, 0.1) 0%, transparent 40%), ' +
          'radial-gradient(circle at 75% 75%, rgba(11, 197, 234, 0.08) 0%, transparent 40%)',
      },
    },
  },
  colors: {
    brand: {
      50: '#E6FFFA',
      100: '#B2F5EA',
      200: '#81E6D9',
      300: '#4FD1C5',
      400: '#38B2AC',
      500: '#0BC5EA',
      600: '#00A3C4',
      700: '#0987A0',
      800: '#086F83',
      900: '#065666',
    },
    accent: {
      50: '#F5E9FF',
      100: '#E9D2FF',
      200: '#D6BCFA',
      300: '#B794F4',
      400: '#9F7AEA',
      500: '#805AD5',
      600: '#6B46C1',
      700: '#553C9A',
      800: '#44337A',
      900: '#322659',
    },
    success: {
      500: '#48BB78',
    },
    warning: {
      500: '#ECC94B',
    },
    error: {
      500: '#F56565',
    },
    gray: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#718096',
      600: '#4A5568',
      700: '#2D3748',
      800: '#1A202C',
      900: '#171923',
    },
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'md',
        _focus: {
          boxShadow: 'none',
        },
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(11, 197, 234, 0.3)',
          },
          _active: {
            bg: 'brand.700',
            transform: 'translateY(0)',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'rgba(11, 197, 234, 0.1)',
          },
        },
        ghost: {
          color: 'white',
          _hover: {
            bg: 'rgba(255, 255, 255, 0.1)',
          },
        },
        link: {
          color: 'brand.500',
          _hover: {
            textDecoration: 'none',
            color: 'brand.400',
          },
        },
        gradient: {
          bgGradient: 'linear(to-r, brand.500, accent.500)',
          color: 'white',
          _hover: {
            bgGradient: 'linear(to-r, brand.600, accent.600)',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(128, 90, 213, 0.3)',
          },
          _active: {
            transform: 'translateY(0)',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        p: '6',
        bg: 'rgba(26, 32, 44, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: 'lg',
        borderWidth: '1px',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
        transition: 'all 0.3s ease',
        _hover: {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
          borderColor: 'rgba(11, 197, 234, 0.3)',
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: '600',
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: 'rgba(26, 32, 44, 0.8)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            _hover: {
              bg: 'rgba(26, 32, 44, 0.9)',
            },
            _focus: {
              bg: 'rgba(26, 32, 44, 0.9)',
              borderColor: 'brand.500',
            },
          },
        },
      },
      defaultProps: {
        variant: 'filled',
      },
    },
  },
});

export default theme; 