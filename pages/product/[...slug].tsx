import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import primsa from "../../lib/prisma";
import styled from "styled-components";
import Navbar from "../../components/Navbar";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;
  padding: 5rem;
`;

const ImageContainer = styled.div`
  border: 3px solid rgba(52, 152, 255, 0.5);
  border-radius: 0.5rem;
  display: flex;
  padding: 0.3rem;
  align-items: center;
  transition: border 0.2s;
  cursor: pointer;

  &:hover {
    border: 3px solid rgba(52, 152, 255, 1);
  }
`;

const DetailsSide = styled.div`
  padding-top: 2rem;
  h1,
  h2 {
    font-size: 1.5rem;
    font-family: "Poppins", sans-sarif;
    font-weight: 500;
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

const Product: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  data,
}: {
  data: Product;
}) => {
  return (
    <>
      <Navbar />

      <Container>
        <ImageContainer>
          <img src={data.image} />
        </ImageContainer>

        <DetailsSide>
          <h1>{data.name}</h1>
          <h2>₹{data.price}</h2>

          <button>Buy now</button>
          <button>Add to Cart</button>
        </DetailsSide>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = ctx.query.slug as string[];
  if (!slug) {
    return {
      props: {
        data: undefined,
      },
    };
  }

  const data = await primsa.product.findUnique({
    where: {
      slug: slug[0],
    },
    select: {
      name: true,
      price: true,
      stock: true,
      image: true,
      id: true,
    },
  });

  return {
    props: {
      data: data,
    },
  };
};

export default Product;
