import React, { KeyboardEvent } from "react";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import {
  InputGroup,
  AutoComplete,
  Badge,
  ButtonToolbar,
  IconButton,
  Drawer,
  Panel,
  Button,
  ButtonGroup,
} from "rsuite";
import { Icon } from "@rsuite/icons";
import SearchIcon from "@rsuite/icons/Search";
import AddIcon from "@rsuite/icons/AddOutline";
import MinusIcon from "@rsuite/icons/Minus";
import axios from "axios";
import useCart from "../store/store";

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
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;

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
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  quantity: number;
};

type Cart = {
  total: number;
  totalqty: number;
  cartContent: Product[];
};

const Navbar: React.FunctionComponent = () => {
  const router = useRouter();
  const [searchData, setSearchData] = React.useState<Product[]>([]);
  const [open, setOpen] = React.useState(false);
  const [cart, setCart] = React.useState<Cart>({
    cartContent: [],
    total: Number(""),
    totalqty: Number(""),
  });
  const cartData = useCart() as Cart;

  React.useEffect(() => {
    setCart({
      cartContent: cartData.cartContent,
      total: cartData.total,
      totalqty: cartData.totalqty,
    });
  }, [cartData]);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = await (
      await axios.post(`/api/product/search`, {
        search: e.target.value,
      })
    ).data;

    if (!data) {
      return router.push("/s", { query: e.target.value });
    }

    setSearchData(data);
  };

  const onEnter = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const element = e.target as HTMLInputElement;

    router.push("/s", { query: element.value });
  };

  return (
    <NavContainer>
      <span id="left">
        <p id="title" onClick={() => router.push("/")}>
          Book<span style={{ color: "#4E60FF" }}>Deal</span>
        </p>
        <div>
          <InputGroup
            inside
            onChange={onChange}
            size="lg"
            onKeyDown={(e: KeyboardEvent<HTMLImageElement>) =>
              e.code === "Enter" ?? onEnter
            }
          >
            <AutoComplete
              data={searchData.map((d) => d.name) as []}
              size="lg"
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
        <div>
          <Badge content={cart.totalqty} color="blue">
            <ButtonToolbar>
              <IconButton
                style={{ padding: ".6rem" }}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(!open);
                }}
                icon={<Icon as={CartIcon} />}
              />
            </ButtonToolbar>
          </Badge>
        </div>

        <div className="user">
          <Image
            src="/20.jpg"
            height={45}
            width={45}
            draggable="false"
            style={{ borderRadius: ".5rem" }}
          />
        </div>
      </span>

      <Drawer open={open} onClose={() => setOpen(false)} size="xs">
        <Drawer.Header>
          <Drawer.Title style={{ fontSize: "1.5rem" }}>My Cart</Drawer.Title>
          <Drawer.Actions>
            <Button size="lg" color="blue" appearance="primary">
              Checkout
            </Button>
          </Drawer.Actions>
        </Drawer.Header>

        <Drawer.Body>
          {cart.cartContent.map((d) => (
            <Panel key={d.id} bordered style={{ marginBottom: "2rem" }}>
              <div>
                <Image
                  src={d.image}
                  loading="lazy"
                  quality="50"
                  draggable="false"
                  height="150px"
                  width="250px"
                  objectFit="cover"
                  objectPosition="top"
                  priority={false}
                />
                <h1 style={{ fontSize: "1.5em" }}>{d.name}</h1>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ fontSize: "1.3em" }}>
                    Price:{" "}
                    <strong style={{ letterSpacing: "1px" }}>
                      ₹{d.price * d.quantity}
                    </strong>
                  </div>
                  <div style={{ fontSize: "1.3em" }}>
                    Quantity:{" "}
                    <strong style={{ letterSpacing: "1px" }}>
                      {d.quantity}
                    </strong>
                  </div>
                </div>

                <ButtonToolbar
                  style={{
                    fontSize: "1.5em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                    marginTop: "1rem",
                  }}
                >
                  <IconButton icon={<MinusIcon />} />
                  <span>{d.quantity}</span>
                  <IconButton icon={<AddIcon />} />
                </ButtonToolbar>
              </div>
            </Panel>
          ))}
        </Drawer.Body>
      </Drawer>
    </NavContainer>
  );
};

function CartIcon() {
  return (
    <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 1.66666L2.5 4.99999V16.6667C2.5 17.1087 2.67559 17.5326 2.98816 17.8452C3.30072 18.1577 3.72464 18.3333 4.16667 18.3333H15.8333C16.2754 18.3333 16.6993 18.1577 17.0118 17.8452C17.3244 17.5326 17.5 17.1087 17.5 16.6667V4.99999L15 1.66666H5Z"
        stroke="#1499ef"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 5H17.5"
        stroke="#1499ef"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3333 8.33334C13.3333 9.2174 12.9821 10.0652 12.357 10.6904C11.7319 11.3155 10.884 11.6667 9.99999 11.6667C9.11593 11.6667 8.26809 11.3155 7.64297 10.6904C7.01785 10.0652 6.66666 9.2174 6.66666 8.33334"
        stroke="#1499ef"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export default Navbar;
