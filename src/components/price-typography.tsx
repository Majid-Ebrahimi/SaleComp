import { SxProps, Theme, Typography } from "@mui/material";

interface Props {
  price: number | undefined;
  sx?: SxProps<Theme>;
}

const PriceTypography = (props: Props) => {
  return (
    <>
      <Typography variant="body1" sx={props.sx}>
        تومان
        <b>
          {Intl.NumberFormat("en-US", {
            maximumSignificantDigits: 4,
          }).format(Number(props.price) * 50000)}
        </b>
      </Typography>
    </>
  );
};

export default PriceTypography;
