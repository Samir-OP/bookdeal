import React from "react";
import Head from "next/head";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import ProductCart from "../components/ProductCard";
import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const Container = styled.div``;
const Grid = styled.div`
  display: grid;
  place-content: center;
  padding: 5rem;
`;
const ProductsContainer = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1500px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  slug: string;
};

const Home: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  product,
}: {
  product: Product[];
}) => {
  return (
    <Container>
      <Head>
        <title>Bookdeal</title>
        <meta name="description" content="Buy books in cheap prices!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Grid>
        <ProductsContainer>
          {product.map((value: Product) => (
            <ProductCart
              key={value.id}
              title={value.name}
              price={value.price}
              image={value.image}
              stock={value.stock}
              slug={value.slug}
              id={value.id}
            />
          ))}
        </ProductsContainer>
      </Grid>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const result = await axios.get("http://localhost:3000/api/product");
  const data: Product[] = result.data;

  return {
    props: {
      product: data,
    },
  };
};

export default Home;
