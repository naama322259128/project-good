import './Auction.scss';
import { Header, Modal } from 'semantic-ui-react';
import p from '../../img/car.jpg';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import {deleteProductFromCart} from '../../store/actions/user';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 160,
  },
});

const getCnt = (_id) => {
  let arr = JSON.parse(localStorage.getItem("shoppingCart"));
  if (!arr) return 0;
  let index = arr.findIndex(item => item.product_id == _id);
  if (index != -1)
    return arr[index].cnt;
  return 0;
}

const ProductInCart = (props) => {
  const [open, setOpen] = React.useState(false)
  const classes = useStyles();

  let image_src = p;//עד שנעשה את הקטע של התמונות
  let description = props.item.product.description;
  let name = props.item.product.name;
  let price = props.item.product.prices;
  let _id = props.item.product._id;

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

          <i className="trash icon" onClick={(e) => { e.stopPropagation();props.deleteProductFromCart(_id)}}></i>
          <IconButton color="primary"
            onClick={(e) => {
              let c = getCnt(_id);
              if (c > 0) props.setCntOfProductInCart(_id, c - 1);
              e.stopPropagation();
            }}  >
            -</IconButton>
          <h2>{getCnt()}</h2>
          <IconButton color="primary"
            onClick={(e) => {
              let c = getCnt(_id);
              props.setCntOfProductInCart(_id, c + 1);

              e.stopPropagation();
            }}
          >+</IconButton>
        </Card >}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >

      <Header ><h1>{name}</h1></Header>
      <Modal.Content>
        {description}<br />
        <img src={image_src}></img>
      </Modal.Content>
    </Modal >
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    loginIsOpen: state.user.loginIsOpen,
    currnetAuction: state.auction._id
  }
}
export default connect(mapStateToProps, {deleteProductFromCart})(ProductInCart);

