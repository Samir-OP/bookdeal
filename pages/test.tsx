import Image from "next/image";
import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";

type SpaceXData = {
  name: string;
  links: {
    patch: {
      large: string;
    };
  };
};

const getSpaceXData = async () =>
  await (await fetch("https://api.spacexdata.com/v5/launches/latest")).json();

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["spacex"], getSpaceXData);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function test() {
  const { data, isLoading } = useQuery<SpaceXData>(["spacex"], getSpaceXData);

  if (isLoading) return <div>loading....</div>;
  if (!data) return <div>No Data</div>;

  return (
    <div>
      <h1>{data?.name}</h1>
      <Image
        src={data?.links.patch.large}
        draggable={false}
        width={400}
        height={400}
      />
    </div>
  );
}
