import React, { useState, useRef } from 'react';
import { Box, Image } from '@chakra-ui/react';

export const ImageSlider = ({ productDetails }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const imageRefs = useRef([]);

    const handleThumbnailClick = (index) => {
        setSelectedImageIndex(index);
        imageRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    };

    return (
        <>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} margin={'auto'}>
                <Box marginBottom={'20px'} width="100%" display={'flex'} alignItems={'center'} justifyContent={'center'} textAlign="center">
                    <Image
                        style={{ imageRendering: 'pixelated', maxWidth: "100%" }}
                        height={"80vh"}
                        margin={"0px 30px"}
                        src={productDetails.Images[selectedImageIndex]}
                    />
                </Box>
                <Box display={'flex'} justifyContent={'center'} overflowX={'scroll'} width="100%">
                    {productDetails.Images.map((img, i) => (
                        <Image
                            key={i}
                            onClick={() => handleThumbnailClick(i)}
                            cursor={'pointer'}
                            border={selectedImageIndex === i ? "2px solid blue" : "2px solid lightgrey"}
                            margin={"5px"}
                            src={img}
                            height={"80px"}
                            width={"80px"}
                            objectFit={'cover'}
                            ref={(el) => (imageRefs.current[i] = el)}
                        />
                    ))}
                </Box>
            </Box>
        </>
    );
};
