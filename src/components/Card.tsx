import { Card, Image, Text } from "@mantine/core";

export default function CardComponent() {
  return (
    <div className="w-36">
      <Card shadow="sm" padding="lg">
        <Card.Section>
          <div className="rounded-full">
            <Image
              src="https://m.media-amazon.com/images/M/MV5BOGQ3ZjMwZDctZTFkMi00ZjUwLTlmMDUtNDZlYzJjNzZiNTg5XkEyXkFqcGdeQXVyMTMzODk3NDU0._V1_.jpg"
              h={160}
              width={10}
              alt="No way!"
            />
          </div>
        </Card.Section>
        <Card.Section bg="dark">
          <Text mt="xs" c="#fff" size="md" px="lg">
            RRR
          </Text>

          <Text mt="xs" c="gray" size="xs" px="lg" pb="xs">
            M.M.Keeravani
          </Text>
        </Card.Section>
      </Card>
    </div>
  );
}
