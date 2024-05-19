import { Box, Icon } from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const RatingStar = ({ rating }) => {
  const stars = [];
  const floorRating = Math.floor(rating);
  const decimalRating = rating - floorRating;

  for (let i = 0; i < floorRating; i++) {
    stars.push(<Icon key={i} as={FaStar} color={rating >= 4 ? "rgba(250, 255, 0, 0.8)" : rating >= 2.5 ? "rgba(255, 130, 0, 0.8)" : "red.500"} />);
  }

  if (decimalRating >= 0.5) {
    stars.push(<Icon key="half" as={FaStarHalfAlt} color={rating >= 4 ? "rgba(250, 255, 0, 0.8)" : rating >= 2.5 ? "rgba(255, 130, 0, 0.8)" : "red.500"} />);
  }

  while (stars.length < 5) {
    stars.push(<Icon key={stars.length} as={FaStar} color="gray.300" />);
  }

  return (
    <Box display={"flex"} >
      {stars.map((star, index) => (
        <Box key={index} mr={1}>
          {star}
        </Box>
      ))}
    </Box>
  );
};

export default RatingStar;
