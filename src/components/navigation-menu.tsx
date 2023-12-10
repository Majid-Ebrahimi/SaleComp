import { Product } from "@/models";
import { LoadingButton } from "@mui/lab";
import { Button, Menu, MenuItem, Tab, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  // categories: Product["category"][] | undefined[] | undefined;
  setCategory: Dispatch<SetStateAction<string>>;
}

const CustomTab = styled(Tab)({
  boxShadow: "none",
  color: "inherit",
  marginBottom: "7px",
  fontSize: 17,
  borderRadius: 0,
  "&:hover": {
    backgroundColor: "#007aaa",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#018Dba",
    color: "#fff",
  },
  "&:focus": {
    backgroundColor: "#00A6DD",
    borderRadius: "3px",
    color: "inherit",
    height: "50px",
    boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.50)",
  },
});

const NavigationMenu = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const {
    isFetching: categoriesIsFetching,
    error: categoriesError,
    data: categoriesData,
    isLoading: categoriesIsLoading,
  } = useQuery<Product["category"][] | undefined[]>({
    queryFn: async () =>
      (await axios.get(`https://dummyjson.com/products/categories`)).data,
    queryKey: ["categories"],
    retry: false,
  });

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    categoriesData !== undefined &&
      props.setCategory(
        `/category/${event.currentTarget.textContent as string}`
      );
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <LoadingButton
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        onClick={handleClickListItem}
        loading={categoriesIsFetching || categoriesIsLoading}
      >
        {categoriesData?.[selectedIndex]
          ? categoriesData?.[selectedIndex]
          : "All Categories"}
      </LoadingButton>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
        PaperProps={{
          style: {
            maxHeight: 400,
          },
        }}
      >
        <MenuItem
          selected={-1 === selectedIndex}
          onClick={() => {
            setSelectedIndex(-1);
            setAnchorEl(null);
            props.setCategory("");
          }}
        >
          All Categories
        </MenuItem>
        {categoriesData?.map((item, index) => (
          <MenuItem
            key={item}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default NavigationMenu;
