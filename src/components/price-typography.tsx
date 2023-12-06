import { SxProps, Theme, Typography } from "@mui/material";

interface Props {
  price: number | undefined;
  sx?: SxProps<Theme>;
}

const PriceTypography = (props: Props) => {
  return (
    <>
      <Typography variant="body1" sx={props.sx}>
        $
        <b style={{ margin: "0 2px 0 2px" }}>
          {Intl.NumberFormat("en-US", {
            maximumSignificantDigits: 4,
          }).format(Number(props.price))}
        </b>
      </Typography>
    </>
  );
};

export default PriceTypography;
