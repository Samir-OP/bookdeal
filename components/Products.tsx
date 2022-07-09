import React from "react";
import ProductCard from "./ProductCard";
import { GetServerSideProps } from "next";
import ErrorPage from "next/error";
import axios from "axios";
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  place-content: center;
  padding: 5rem;
`;
const Grid = styled.div`
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
};

const Product: React.FunctionComponent = (props) => {
  console.log(props);
  if (!props.data) return <ErrorPage statusCode={404} />;

  return (
    <GridContainer>
      <Grid>
        <ProductCard title="1" price={200} image="/chem.jpeg" />
        <ProductCard title="1" price={200} image="/phy.jpg" />
        <ProductCard
          title="1"
          price={200}
          image="https://via.placeholder.com/250x150"
        />
        <ProductCard
          title="1"
          price={200}
          image="https://via.placeholder.com/250x150"
        />
      </Grid>
    </GridContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const result = await axios.get("http://localhost:3000/api/product");
    const data: Product = await result.data;

    return {
      props: { data },
    };
  } catch (error) {
    ctx.res.statusCode = 404;
    return {
      props: {
        data: error,
      },
    };
  }
};

export default Product;
