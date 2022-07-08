import React from "react";
import Image from "next/image";
import styled from "styled-components";

import { InputGroup, AutoComplete } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";

const data = [
  "HYPER Advertiser",
  "HYPER Web Analytics",
  "HYPER Video Analytics",
  "HYPER DMP",
  "HYPER Ad Serving",
  "HYPER Data Discovery",
];

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
      transition: 0.2s;
      cursor: pointer;
      &:hover {
        border: 3px solid rgba(52, 152, 255, 1);
      }
    }
  }
`;

const Input = styled(InputGroup)``;

const Navbar: React.FunctionComponent = () => {
  return (
    <NavContainer>
      <span id="left">
        <p id="title">
          Book<span style={{ color: "#4E60FF" }}>Deal</span>
        </p>
        <div>
          <Input inside>
            <AutoComplete data={data as []} placeholder="Search Books" />
            <InputGroup.Button>
              <SearchIcon />
            </InputGroup.Button>
          </Input>
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
