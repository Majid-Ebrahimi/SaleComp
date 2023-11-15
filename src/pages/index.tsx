
import ProductCard from '@/views/cards/product-card/ProductCard'
import { AppBar, Box, Button, Container, Grid, List, ListItem, Typography } from '@mui/material'
import { dir } from 'console'

export default function Home() {
  return (
    <Box dir='rtl'>
      <Grid>
        <Typography>
          SaleComp
        </Typography>
      </Grid>
      <AppBar position='static'>
          <Grid container spacing={5}>
            <Grid item>
          <Button variant='contained'>
          test
        </Button>

            </Grid>
            <Grid item>
        <Button variant='contained'>
          test1
        </Button>

            </Grid>
            <Grid item>
        <Button variant='contained'>
          test2
        </Button>

            </Grid>
            <Grid item>
        <Button variant='contained'>
          test3
        </Button>

            </Grid>
            <Grid item>
            <Button variant='contained'>
          test4
        </Button>
            </Grid>

          </Grid>
        
        
      </AppBar>

      <Box>
        <List  >
          {[1,2,3,4,5,6,7].map((item,index)=>{
            return (
              <ProductCard key={index}/>
            )
          })}
        </List>
              </Box>
              <ProductCard/>

    </Box>
  )
}
