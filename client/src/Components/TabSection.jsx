import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { MensCategoryTab } from './MensCategoryTab';
import { WomenCategoryTab } from './WomenCategoryTab';

export const TabSection = () => {

    return (
        <>
            <Tabs>
                <TabList display={'flex'} alignItems={'center'} gap={"5vw"} justifyContent={'center'} >
                    <Tab>MEN SECTION</Tab>
                    <Tab>WOMEN SECTION</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <MensCategoryTab />
                    </TabPanel>
                    <TabPanel>
                        <WomenCategoryTab />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}
