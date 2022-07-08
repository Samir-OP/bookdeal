import React from "react";
import ProductCard from "./ProductCard";

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

const Product: React.FunctionComponent = () => {
  return (
    <GridContainer>
      <Grid>
        <ProductCard title="1" price={200} />
        <ProductCard title="1" price={200} />
        <ProductCard title="1" price={200} />
        <ProductCard title="1" price={200} />
        <ProductCard title="1" price={200} />
        <ProductCard title="1" price={200} />
        <ProductCard title="1" price={200} />
        <ProductCard title="1" price={200} />
        <ProductCard title="1" price={200} />
        <ProductCard title="1" price={200} />
        <ProductCard title="1" price={200} />
        <ProductCard title="1" price={200} />
      </Grid>
    </GridContainer>
  );
};

export default Product;
