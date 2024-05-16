import { Box, Button, Input } from '@chakra-ui/react'
import React from 'react'

export const SearchBar = () => {
    return (
        <>
            <Box>
                <form style={{ display: "flex" }} >
                    <Input placeholder='Search Items' />
                    <Button>Search</Button>
                </form>
            </Box>
        </>
    )
}
