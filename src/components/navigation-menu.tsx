import { Product } from "@/models";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  styled,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  categories: Product["category"][] | undefined[] | undefined;
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
  /* const [value, setValue] = useState(-1);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    props.setCategory(`/category/${event.currentTarget.textContent as string}`);
  }; */
  /* return (
    <Box sx={{ direction: "ltr", width: "100%" }}>
      <Tabs
        onChange={handleChange}
        value={value}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="Tabs where each tab needs to be selected manually"
      >
        {props.categories &&
          props.categories.map((item) => {
            return <Tab key={item} label={item} />;
          })}
      </Tabs>
    </Box>
  ); */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    // console.log(event.currentTarget.textContent);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    props.categories !== undefined &&
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
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        onClick={handleClickListItem}
      >
        {props.categories?.[selectedIndex]
          ? props.categories?.[selectedIndex]
          : "All Categories"}
      </Button>
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
        {/*TODO: fix thisline */}
        <MenuItem
          // disabled={index === 0}
          selected={-1 === selectedIndex}
          onClick={() => {
            setSelectedIndex(-1);
            setAnchorEl(null);
            props.setCategory("");
          }}
        >
          All Categories
        </MenuItem>
        {props.categories?.map((item, index) => (
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
