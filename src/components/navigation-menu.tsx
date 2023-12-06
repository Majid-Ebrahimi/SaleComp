import { Product } from "@/models";
import { Box, Tab, Tabs, TextField, styled } from "@mui/material";
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
  const [value, setValue] = useState(-1);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    props.setCategory(`/category/${event.currentTarget.textContent as string}`);
  };
  return (
    <Box sx={{ direction: "ltr", width: "100%" }}>
      <Tabs
        onChange={handleChange}
        value={value}
        variant="scrollable"
        scrollButtons
        // indicatorColor={""}
        allowScrollButtonsMobile
        aria-label="Tabs where each tab needs to be selected manually"
      >
        {props.categories &&
          props.categories.map((item) => {
            return <Tab key={item} label={item} />;
          })}
      </Tabs>
    </Box>
  );
};

export default NavigationMenu;
