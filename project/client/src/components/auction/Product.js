import './Auction.scss';
import { Header, Modal } from 'semantic-ui-react';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { updateShoppingCart } from '../../store/actions/user';
import { addProductToShoppingCartInDB } from '../../utils/userUtils';
import defaultImg from '../../img/picture.png'

import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 160
  },

});

const Product = (props) => {


  const [open, setOpen] = React.useState(false)
  const classes = useStyles();
  let [cnt, setCnt] = useState(0);
  let image_src = props.product.image || defaultImg;//TODO לשים תמונה סתם
  let description = props.product.description;
  let name = props.product.name;
  let price = props.product.prices;

  return (
    <Modal
      closeIcon
      open={open}
      trigger={
        <Card className={classes.root, "product-in-list"} >

          <center>{name}</center>
          <Typography gutterBottom variant="h5" component="h2">{price}</Typography>
          <CardMedia className={classes.media} image={image_src} title={name} />
          <IconButton color="primary" onClick={(e) => { let c = cnt; if (cnt > 0) setCnt(c - 1); e.stopPropagation(); }}  >-</IconButton>
          <h2 style={{ display: "inline-block", fontSize: '2vh' }}>{cnt}</h2>
          <IconButton color="primary" onClick={(e) => { let c = cnt; setCnt(c + 1); e.stopPropagation(); }}>+</IconButton>

          {/* הוסף לסל */}
          <IconButton color="primary" aria-label="add to shopping cart" id="add-to-cart-btn">
            {/* TODO: לא לאפשר כאשר הכמות קטנה מאחד */}
            <AddShoppingCartIcon
              onClick={(e) => {
                e.stopPropagation();
                addProductToShoppingCartInDB(props.currentAuction._id, props.currentUser._id, props.product._id, cnt).then(succ => {
                  debugger;
                  if (succ.status != 400) {
                    props.updateShoppingCart(succ.data);
                    setCnt(0);
                  }
                })
              }} />
          </IconButton>


        </Card>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >

      <Header ><h1>{name}</h1></Header>
      <Modal.Content><img src={image_src} style={{ width: '30%', height: 'auto' }} /><div style={{ marginLeft: '2vw', marginTop: '2vh', overflowWrap: 'break-word' }}>{description}</div></Modal.Content>

    </Modal>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    currentAuction: state.currentAuction.currentAuction
  }
}
export default connect(mapStateToProps, { updateShoppingCart })(Product);
