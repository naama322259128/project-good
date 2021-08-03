import React from 'react'
import './Auction.scss';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import p from '../../img/car.jpg';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 160,
  },
});

const Auction = (props) => {
//   const [open, setOpen] = React.useState(false)
//   const classes = useStyles();
//   let [cnt, setCnt] = useState(0);
//   let image_src = p;
//   let code = "555";
//   let description = "big and nice car. Mitzubishi outlander.";
//   let name = "car";
//   let price = 10;

  return (<>
  <h1>המכירה של</h1>
  <p>{props.item.name}</p>
  </>
    // <Modal
    //   closeIcon
    //   open={open}
    //   trigger={
    //     <Card className={classes.root} >
    //       <Typography gutterBottom variant="h5" component="h2">
    //         {price}
    //       </Typography>
    //       <CardMedia
    //         className={classes.media}
    //         image={image_src}
    //         title="Contemplative Reptile"
    //       />
    //       {/* הוסף לסל */}
    //       <IconButton color="primary" aria-label="add to shopping cart">
    //         <AddShoppingCartIcon />
    //       </IconButton>
    //       {/* הורד כמות */}
    //       <IconButton color="primary" onClick={() => { let c = cnt; if (cnt > 0) setCnt(c - 1) }}  >-</IconButton>
    //       {/* הכמות הנוכחית מרותו מוצר */}
    //       <h2>{cnt}</h2>
    //       {/* הוסף כמות */}
    //       <IconButton color="primary" onClick={() => { let c = cnt; setCnt(c + 1) }}>+ </IconButton>
    //     </Card>}
    //   onClose={() => setOpen(false)}
    //   onOpen={() => setOpen(true)}
    // >

    //   <Header ><h1>{name}</h1></Header>
    //   <Modal.Content>
    //   {"code: "+code}<br/>
    //     {description}<br/>
    //     <img src={image_src}></img>
    //   </Modal.Content>
    // </Modal>
  )
}

export default Auction;
