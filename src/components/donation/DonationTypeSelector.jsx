import React from 'react';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
} from '@chakra-ui/react';

const DonationTypeSelector = ({ donationType, handleDonationTypeChange }) => {
  return (
    <Tabs variant="soft-rounded" colorScheme="brand" mb={8} onChange={handleDonationTypeChange}>
      <TabList>
        <Tab _selected={{ color: 'white', bg: 'brand.500' }}>Sadaqah (Voluntary)</Tab>
        <Tab _selected={{ color: 'white', bg: 'accent.500' }}>Zakat (Obligatory)</Tab>
        <Tab _selected={{ color: 'white', bg: 'green.500' }}>Waqf (Endowment)</Tab>
      </TabList>
      <TabPanels mt={4}>
        <TabPanel px={0}>
          <Text color="gray.300" mb={4}>
            Sadaqah is voluntary charity given to help those in need. It can be given at any time, in any amount, and is a beautiful expression of generosity.
          </Text>
        </TabPanel>
        <TabPanel px={0}>
          <Text color="gray.300" mb={4}>
            Zakat is an obligatory form of charity in Islam, typically 2.5% of one's wealth above a minimum threshold (nisab), given annually.
          </Text>
        </TabPanel>
        <TabPanel px={0}>
          <Text color="gray.300" mb={4}>
            Waqf is an endowment made by a Muslim to a religious, educational, or charitable cause. The donated assets are held and preserved for specific purposes indefinitely.
          </Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default DonationTypeSelector; 