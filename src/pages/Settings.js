import {
    Box,
    Heading,
    Stack,
    StackDivider,
    Flex,
    Button,
    Link,
    Text,
    UnorderedList,
    ListItem,
    Input,
} from '@chakra-ui/react'
import { Card, CardHeader, CardBody } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useColorMode } from '@chakra-ui/react';


export function Settings({ onResetData, onSyncData, onImportData, onExportData, version }) {
    const { colorMode, toggleColorMode } = useColorMode();

    const resetButtonClicked = () => {
        onResetData();
    }

    const syncButtonClicked = () => {
        onSyncData();
    }

    const importButtonClicked = (event) => {
        const file = event.target.files[0];
        if (file) {
          onImportData(file);
        }
      };
    
      const exportButtonClicked = () => {
        onExportData();
      };
    

    const isDarkMode = colorMode !== "light";

    return (<Flex align="center" flexDirection={"column"} w="100%" h="100%" mt={5}>
        <Box w={['100%', '75%', '35%']}>
            <Card w={"100%"}>
                <CardHeader>
                    <Heading size='md'>Settings</Heading>
                </CardHeader>
                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                        <Box>
                            <Button colorScheme={"gray"} onClick={toggleColorMode}>Switch to {isDarkMode ? "Light" : "Dark"} Mode</Button>
                        </Box>
                        <Box>
                            <Button colorScheme='yellow' onClick={syncButtonClicked}>Sync Data</Button>
                        </Box>
                        <Box>
                            <Input
                                type="file"
                                accept=".json"
                                onChange={importButtonClicked}
                                display="none"
                                id="importInput"
                            />
                            <Button
                                colorScheme="blue"
                                onClick={() => document.getElementById("importInput").click()}
                            >
                                Import from file
                            </Button>
                            &nbsp;
                            <Button colorScheme="blue" onClick={exportButtonClicked}>
                                Export to file
                            </Button>
                        </Box>
                        <Box>
                            <Button colorScheme='red' onClick={resetButtonClicked}>Reset Data</Button>
                        </Box>
                        <Box>
                            Made by <Link href='https://github.com/Alekossta' color={"blue.500"} isExternal>Alekossta</Link>
                        </Box>
                        <Box>
                            <Text fontSize="xl" fontWeight="bold">
                                Contributors
                            </Text>
                            <UnorderedList>
                                <ListItem>
                                    DanielPikilidis
                                </ListItem>
                                <ListItem>
                                    matinanadali
                                </ListItem>
                            </UnorderedList>
                            <Text mt={5}>
                                Contribute in <Link href='https://github.com/Alekossta/dit-planner' color={"blue.500"} isExternal>Github</Link>
                            </Text>
                        </Box>
                        <Box>
                            Version: {version}
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        </Box>

    </Flex>)
}