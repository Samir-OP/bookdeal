import React from "react";
import { Panel, ButtonToolbar, IconButton, FlexboxGrid, Badge } from "rsuite";
import { Icon } from "@rsuite/icons";
import Image from "next/image";
import styled from "styled-components";
import { alert } from "../base/alert";
import { useRouter } from "next/router";
import useCart from "../store/store";

type Props = {
  title: string;
  price: number;
  image: string;
  stock: number;
  slug: string;
  id: string;
};

type CartContent = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

const PanelStyle = styled(Panel)`
  display: inline-block;
  width: 250;
  cursor: pointer;
  transition: 0.5s;
  color: #fff;

  &:hover {
    transform: translateY(-10px);
  }
`;

const ProductCard: React.FunctionComponent<Props> = ({
  title,
  price,
  image,
  stock,
  slug,
  id,
}) => {
  const router = useRouter();
  const addTocart = useCart((state) => state.addTocart);
  const updatecart = useCart((state) => state.updatecart);
  const mycart = useCart((state) => state.cartContent) as CartContent[];

  const [content, setContent] = React.useState(0);

  React.useEffect(() => {
    const stocksInLocalStorage = mycart.find((d) => d.id === id);
    if (mycart.length && stocksInLocalStorage?.id == id) {
      setContent(stocksInLocalStorage.quantity);
    }
  }, [mycart]);

  const addProduct = (params) => {
    const product = mycart.findIndex((item) => item.id === params.id);
    if (product !== -1) {
      mycart[product].quantity++;
      updatecart({ params, mycart });
    } else {
      addTocart(params);
    }
  };

  const onClick = () => {
    if (content < stock) {
      setContent(content + 1);
      addProduct({
        id,
        name: title,
        price,
        slug,
        image,
        quantity: content + 1,
      });
    } else {
      alert("error", `We have only ${stock} stocks of this product.`);
    }
  };

  return (
    <div>
      <PanelStyle shaded bordered bodyFill>
        <Image
          src={image}
          loading="lazy"
          quality="50"
          draggable="false"
          height="150px"
          width="250px"
          objectFit="cover"
          objectPosition="top"
          priority={false}
        />

        <Panel
          header={title}
          onClick={(e) => {
            e.preventDefault();
            router.push("/product/" + slug);
          }}
        >
          <FlexboxGrid justify="space-between" align="middle">
            <p>
              Price: <strong>???{price}</strong>
            </p>
            <Badge content={content} color="blue">
              <ButtonToolbar>
                <IconButton
                  style={{ padding: ".5rem" }}
                  onClick={onClick}
                  size="xs"
                  icon={<Icon as={CartIcon} />}
                ></IconButton>
              </ButtonToolbar>
            </Badge>
          </FlexboxGrid>
        </Panel>
      </PanelStyle>
    </div>
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

export default ProductCard;
