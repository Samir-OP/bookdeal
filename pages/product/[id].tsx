import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Product: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <>{id}</>;
};

export default Product;
