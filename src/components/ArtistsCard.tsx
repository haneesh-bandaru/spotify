import { Image, Text } from "@mantine/core";

const ArtistsCard = () => {
  return (
    <div>
      <Image
        src="https://assets.vogue.in/photos/5ce450f63bf9b42092b1f671/16:9/w_1920,h_1080,c_limit/14-A-R-Rahman-songs-the-world-will-always-be-in-love-with.jpg"
        h={160}
        w={160}
        alt="No way!"
        radius="100%"
        fit="cover"
        
      />
      <Text mt="xs" c="white" size="md">
        A.R.Rahman
      </Text>
    </div>
  );
};

export default ArtistsCard;
