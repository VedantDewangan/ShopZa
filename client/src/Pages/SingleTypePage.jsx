import React, { useEffect, useState } from 'react'
import { NavBar } from "../Components/NavBar"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { SingleCard } from '../Components/SingleCard'
import { Box, Text, Select, Skeleton } from '@chakra-ui/react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input
} from '@chakra-ui/react'
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react'

export const SingleTypePage = () => {

  const { name } = useParams()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const [AllProduct, SetAllProduct] = useState([]);
  const [PerviousAllProduct, SetPerviousAllProduct] = useState([]);
  const [page, SetPage] = useState(true);

  const getItem = async (type) => {
    SetLoading(true)
    const { data } = await axios.get(`http://localhost:3000/api/${type}`)
    SetAllProduct(data);
    SetPerviousAllProduct(data)
    SetLoading(false);
  }

  useEffect(() => {
    if (name === "LatestCollection") {
      getItem("getAllLatestCollection")
    }
    else if (name === "MensCollection") {
      getItem("getAllMensCollection")
    }
    else if (name === "WomensCollection") {
      getItem("getAllWomensCollection")
    }
    else if (name === "summerCollection") {
      getItem("getAllSummerCollection")
    }
    else {
      SetPage(false);
    }
  }, [])

  const [Loading,SetLoading] = useState(false)

  const [sortBy, SetSortBy] = useState("");
  const [min, SetMin] = useState(10);
  const [max, SetMax] = useState(50)

  const Sort = () => {
    if (sortBy === "Price Low to High") {
      const filteredProducts = PerviousAllProduct.filter(product => product.newPrice >= min * 100 && product.newPrice <= max * 100);
      const sortedProducts = [...filteredProducts].sort((a, b) => a.newPrice - b.newPrice);
      SetAllProduct(sortedProducts);
    }
    else if (sortBy === "Price High to Low") {
      const filteredProducts = PerviousAllProduct.filter(product => product.newPrice >= min * 100 && product.newPrice <= max * 100);
      const sortedProducts = [...filteredProducts].sort((a, b) => b.newPrice - a.newPrice);
      SetAllProduct(sortedProducts);
    }
    else if (sortBy === "Rating Low to High") {
      const filteredProducts = PerviousAllProduct.filter(product => product.newPrice >= min * 100 && product.newPrice <= max * 100);
      const sortedProducts = [...filteredProducts].sort((a, b) => {
        const getAverageRating = (ratings) => {
          const total = ratings.reduce((sum, ratingObj) => {
            const rating = Object.values(ratingObj)[0];
            return sum + rating;
          }, 0);
          return total / ratings.length * 3;
        };

        const aAverageRating = getAverageRating(a.rating);
        const bAverageRating = getAverageRating(b.rating);

        return aAverageRating - bAverageRating;
      });
      SetAllProduct(sortedProducts);
    }
    else if (sortBy === "Rating High to Low") {
      const filteredProducts = PerviousAllProduct.filter(product => product.newPrice >= min * 100 && product.newPrice <= max * 100);
      const sortedProducts = [...filteredProducts].sort((a, b) => {
        const getAverageRating = (ratings) => {
          const total = ratings.reduce((sum, ratingObj) => {
            const rating = Object.values(ratingObj)[0];
            return sum + rating;
          }, 0);
          return total / ratings.length;
        };

        const aAverageRating = getAverageRating(a.rating);
        const bAverageRating = getAverageRating(b.rating);

        return aAverageRating - bAverageRating;
      }); I
      SetAllProduct(sortedProducts);
    }
    else {
      const filteredProducts = PerviousAllProduct.filter(product => product.newPrice >= min * 100 && product.newPrice <= max * 100);
      SetAllProduct(filteredProducts)
    }
  }

  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <Box>

        <Box id='boxs' display={'flex'} alignItems={'center'} justifyContent={'space-between'} >
          <span style={{margin:"0px 12px"}} class="material-symbols-outlined" onClick={() => {
            navigate("/")
          }} >
            arrow_back
          </span>
          <Button display={'block'} id='sort-but' ref={btnRef} margin={"10px"} onClick={onOpen}>
            Filter
          </Button>
        </Box>
        <Drawer
          isOpen={isOpen}
          placement='bottom'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />

            <DrawerBody>
              <Box width={"90vw"} margin={' 20px auto'} display={'flex'} justifyContent={'space-between'} flexDirection={'column'} height={'max-content'} backgroundColor={"rgb(241, 241, 241)"} padding={"0px 20px"} >
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} gap={"25px"} margin={"20px 0px"} >
                  <Select onChange={(e) => {
                    SetSortBy(e.target.value);
                  }} variant='filled' colorScheme='teal' placeholder='SORT BY'>
                    <option value={"Price Low to High"} >Price Low to High</option>
                    <option value={"Price High to Low"} >Price High to Low</option>
                    <option value={"Rating Low to High"} >Rating Low to High</option>
                    <option value={"Rating High to Low"} >Rating High to Low</option>
                  </Select>

                  <Text>Min Price {min * 100}</Text>
                  <RangeSlider aria-label={['min', 'max']} onChange={(values) => {
                    SetMin(values[0])
                    SetMax(values[1])
                  }} defaultValue={[min, max]}>
                    <RangeSliderTrack>
                      <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} />
                    <RangeSliderThumb index={1} />
                  </RangeSlider>
                  <Text>Max Price {max * 100}</Text>
                </Box>
              </Box>
            </DrawerBody>

            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue'>Filter</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Box display={'flex'} >
          <Box id='sort-drawer' width={"15vw"} display={'flex'} justifyContent={'space-between'} flexDirection={'column'} height={"91vh"} backgroundColor={"rgb(241, 241, 241)"} padding={"0px 20px"} >
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} gap={"25px"} margin={"20px 0px"} >
              <Select onChange={(e) => {
                SetSortBy(e.target.value);
              }} variant='filled' colorScheme='teal' placeholder='SORT BY'>
                <option value={"Price Low to High"} >Price Low to High</option>
                <option value={"Price High to Low"} >Price High to Low</option>
                <option value={"Rating Low to High"} >Rating Low to High</option>
                <option value={"Rating High to Low"} >Rating High to Low</option>
              </Select>

              <Text>Min Price {min * 100}</Text>
              <RangeSlider aria-label={['min', 'max']} onChange={(values) => {
                SetMin(values[0])
                SetMax(values[1])
              }} defaultValue={[min, max]}>
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
              <Text>Max Price {max * 100}</Text>
            </Box>

            <Button onClick={Sort} colorScheme='teal' marginBottom={"25px"} >
              Filter
            </Button>
          </Box>

          <Box id='pro' padding={"20px 30px"} height={"91vh"} overflow={"scroll"} paddingBottom={"25vh"} justifyContent={'space-evenly'} display={'flex'} gap={"30px"} alignItems={'center'} flexWrap={'wrap'} >
            {
              Loading?
              <>
              <Box>
                <Skeleton height={"200px"} />
              </Box>
              </>
              :
              AllProduct.length === 0 ?
                <>
                  <Box>
                    <Text textAlign={'center'} fontSize={"1.6em"}>Sorry No Items Yet</Text>
                    <Text textAlign={'center'} fontSize={"1em"} >New Items Coming Soon</Text>
                  </Box>
                </>
                :
                AllProduct.map((product, i) => {
                  return (
                    <SingleCard
                      key={i}
                      productDetails={product}
                    />
                  )
                })
            }
          </Box>
        </Box>
      </Box>
    </>
  )
}
