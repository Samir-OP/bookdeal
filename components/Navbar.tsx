import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import { InputGroup, AutoComplete } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import axios from "axios";

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem;
  box-shadow: 0px 4px 10px -10px;

  span#left {
    display: flex;
    align-items: center;
    gap: 2rem;
    min-width: max-content;
    p#title {
      font-size: 2em;
      cursor: pointer;
      font-weight: bold;
    }
  }

  span#right {
    min-width: max-content;
    .user {
      border: 3px solid rgba(52, 152, 255, 0.5);
      border-radius: 0.5rem;

      display: flex;
      padding: 0.1rem;
      align-items: center;
      transition: border 0.2s;
      cursor: pointer;
      &:hover {
        border: 3px solid rgba(52, 152, 255, 1);
      }
    }
  }
`;

type Product = {
  slug: string;
  name: string;
};

const Navbar: React.FunctionComponent = () => {
  const router = useRouter();
  const [searchData, setSearchData] = React.useState<Product[]>([]);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = await (
      await axios.post(`/api/product/search`, {
        search: e.target.value,
      })
    ).data;
    setSearchData(data);
  };

  return (
    <NavContainer>
      <span id="left">
        <p id="title" onClick={() => router.push("/")}>
          Book<span style={{ color: "#4E60FF" }}>Deal</span>
        </p>
        <div>
          <InputGroup inside onChange={onChange}>
            <AutoComplete
              data={searchData.map((d) => d.name) as []}
              placeholder="Search Books"
              onSelect={(e) =>
                router.push(
                  `/product/${
                    searchData[
                      searchData
                        .map((d) => d.name)
                        .findIndex((e) => e.toLowerCase() === e.toLowerCase())
                    ].slug
                  }`
                )
              }
            />
            <InputGroup.Button>
              <SearchIcon />
            </InputGroup.Button>
          </InputGroup>
        </div>
      </span>

      <span id="right">
        <div className="user">
          <Image
            src="/19.jpg"
            height={45}
            width={45}
            draggable="false"
            style={{ borderRadius: ".5rem" }}
          />
        </div>
      </span>
    </NavContainer>
  );
};

export default Navbar;
