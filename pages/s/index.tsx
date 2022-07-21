import React from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";

export default function SearchQuery() {
  const router = useRouter();
  console.log(router.query.query);
  return (
    <div>
      <Navbar />
    </div>
  );
}
