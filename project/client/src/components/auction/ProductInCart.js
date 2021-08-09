import React from 'react'
import './Auction.scss';
import { Header, Modal } from 'semantic-ui-react';
import p from '../../img/car.jpg';
import IconButton from '@material-ui/core/IconButton';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import { deleteProductFromCart,setCnt } from '../../store/actions/user'

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 160,
  },
});

const ProductInCart = (props) => {
  const [open, setOpen] = React.useState(false)
  const classes = useStyles();
  let [cnt, setCnt] = useState(props.item.cnt);
  let image_src = p;//עד שנעשה את הקטע של התמונות
  let code = props.item.product.code;
  let description = props.item.product.description;
  let name = props.item.product.name;
  let price = props.item.product.prices;

  return (
    <Modal
      closeIcon
      open={open}
      trigger={
        <Card className={classes.root} >
          {name}
          <Typography gutterBottom variant="h5" component="h2">
            {price}
          </Typography>
          <CardMedia
            className={classes.media}
            image={image_src}
            title="Contemplative Reptile"
          />

          {/* פח */}
          <i class="trash icon" onClick={(e) => { e.stopPropagation(); props.deleteProductFromCart(code) }}></i>
          {/* הורד כמות */}
          <IconButton color="primary" onClick={(e) => { let c = cnt; if (cnt > 0) setCnt(c - 1); props.setCnt(code,cnt); e.stopPropagation(); }}  >-</IconButton>
          {/* הכמות הנוכחית מרותו מוצר */}
          <h2>{cnt}</h2>
          {/* הוסף כמות */}
          <IconButton color="primary" onClick={(e) => { let c = cnt; setCnt(c + 1); props.setCnt(code,cnt); e.stopPropagation(); }}>+</IconButton>
        </Card>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >

      <Header ><h1>{name}</h1></Header>
      <Modal.Content>
        {"code: " + code}<br />
        {description}<br />
        <img src={image_src}></img>
      </Modal.Content>
    </Modal>
  )
}


export default connect(null, { deleteProductFromCart ,setCnt})(ProductInCart);