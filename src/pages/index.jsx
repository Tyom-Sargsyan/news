import {
  Button,
  Container,
  Flex,
  GridItem,
  Heading,
  Img,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getNewsByDate } from "@/services";
import { useDate } from "@/hooks";
import Head from "next/head";
import { RotatingTriangles } from "react-loader-spinner";
import { useTranslation } from "@/contexts/TranslationContext";

export default function Home() {
  const { t, setLanguage, language } = useTranslation();
  const { getStructuredDate } = useDate();
  const [parsedHTML, setParsedHTML] = useState();
  useEffect(() => {
    getNewsByDate({ ...getStructuredDate("2022-02-25"), language }).then((data) =>
      setParsedHTML(data)
    );
  }, [language]);
  return (
    <>
      <Head>
        <title>News</title>
      </Head>
      <main>
        <Container maxW="container.xl">
          <Button
            colorScheme="blue"
            onClick={() => {
              setLanguage("hy");
            }}
          >
            Arm
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              setLanguage("en");
            }}
          >
            Eng
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              setLanguage("ru");
            }}
          >
            Rus
          </Button>
          <Heading>{t("Hello")}</Heading>
          {!parsedHTML ? (
            <Flex justifyContent="center" w="full" mt={40}>
              <RotatingTriangles
                visible={true}
                height="80"
                width="80"
                colors={["red", "blue", "orange"]}
                ariaLabel="rotating-triangels-loading"
                wrapperStyle={{}}
                wrapperClass="rotating-triangels-wrapper"
              />
            </Flex>
          ) : (
            <SimpleGrid minChildWidth="320px" spacing="40px">
              {parsedHTML?.map((article) => (
                <GridItem w="100%" key={article.title}>
                  <Flex
                    as={Link}
                    href={article.link}
                    key={article.title}
                    direction="column"
                    _hover={{ textDecoration: "none" }}
                  >
                    <Img
                      src={article.img}
                      alt="img"
                      h="200px"
                      objectFit="cover"
                    />
                    <Heading fontSize="2xl" noOfLines={2}>
                      {article.title}
                    </Heading>
                    <Text fontSize="md" noOfLines={3}>
                      {article.description}
                    </Text>
                    <Text fontSize="sm">{article.date}</Text>
                  </Flex>
                </GridItem>
              ))}
            </SimpleGrid>
          )}
        </Container>
      </main>
    </>
  );
}
