# GitHub Copilot Instructions for AmanahBlock Project

## Project Context

AmanahBlock is a Shariah-compliant blockchain platform for transparent charitable donations:

- Focused on Islamic charity types: Waqf, Zakat, Sadaqah
- Implements milestone-based fund release with verification
- Provides transparent tracking of donations and impact
- Includes DAO governance for community decisions
- Features Islamic finance tools and compliance checks

## Tech Stack Context

- **Frontend**: React.js, Chakra UI, Framer Motion, React Router
- **Blockchain**: Ethereum/BSC, Ethers.js, Solidity smart contracts
- **Development**: Hardhat for Ethereum development

## Coding Rules and Best Practices

### React/Frontend Standards

- Use functional components with hooks (avoid class components)
- Follow consistent component structure:
  1. Imports
  2. Component definition
  3. State/hooks
  4. Helper functions
  5. Effects
  6. Return/JSX
- Destructure props at the component definition level
- Use proper Chakra UI responsive patterns with the design system
- Keep components focused with single responsibilities (extract complex logic)
- Implement proper loading states and error handling
- Use proper React state management patterns (avoid prop drilling)

### Blockchain/Web3 Standards

- Handle async operations properly with try/catch blocks
- Always implement proper error messages for blockchain operations
- Use defensive programming when dealing with user wallets
- Follow gas optimization patterns in smart contracts
- Validate all user inputs before blockchain transactions
- Add transaction confirmation checks after sending transactions
- Implement proper fallbacks for network connectivity issues
- Always confirm blockchain operations in the UI

### Styling and UI Standards

- Use Chakra UI's built-in responsive props (`{base: "value", md: "value", lg: "value"}`)
- Follow the project's design tokens (colors, spacing, etc.)
- Use Chakra's theme extensions in `theme.js` for custom styling
- Use motion components consistently for animations
- Ensure all UI elements are accessible (proper contrast, focus states, etc.)
- Use consistent loading states across the application
- Implement proper error visualization for user errors

### Islamic Finance Compliance

- Ensure all financial operations follow Shariah principles
- Implement proper validation for Zakat calculations
- Add Shariah compliance checks in smart contracts
- Document all Islamic finance rules in code comments
- Verify charity pool management follows Islamic finance principles

### Smart Contract Patterns

- Use battle-tested contract patterns (OpenZeppelin where possible)
- Implement proper access control mechanisms
- Add events for important state changes for frontend tracking
- Use modifiers for repeated validation logic
- Add NatSpec comments to document contract functions
- Implement proper upgradability patterns when needed
- Use proper error handling with custom errors/require statements

### Testing Requirements

- Ensure components have proper unit tests
- Write comprehensive tests for smart contracts
- Test edge cases in financial calculations
- Implement integration tests for component interactions
- Add proper mocks for blockchain interactions in tests

### Performance Considerations

- Minimize component re-renders (use memoization where appropriate)
- Optimize blockchain data fetching with caching
- Implement proper pagination for data lists
- Use windowing for long lists (virtualization)
- Optimize images and assets for web delivery
- Follow proper code splitting patterns

### Security Standards

- Validate all user inputs on frontend and backend
- Implement proper wallet connection security
- Follow best practices for smart contract security
- Use proper CSRF protection in API calls
- Implement rate limiting for sensitive operations
- Add proper error handling without exposing sensitive information
- Use environment variables for sensitive configuration

## File Structure Patterns

Maintain the established project structure:

- React components in `/components` folder, organized by feature
- Pages in `/pages` folder
- Smart contracts in `/amanahblock-backend/contracts`
- Context providers in `/context`
- Utility functions in `/utils`
- Styling in `/styles`

## Naming Conventions

- React components: PascalCase
- Functions/variables: camelCase
- Smart contracts: PascalCase
- CSS classes: kebab-case
- Files: Follow existing patterns for each folder
- Contract functions: camelCase with descriptive names

## Documentation Requirements

- Add JSDoc comments for functions and components
- Document complex blockchain operations with examples
- Explain Islamic finance concepts in relevant components
- Provide usage examples in component comments
- Document state management flows
