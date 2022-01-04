import './Auction.scss';
import { Header, Modal } from 'semantic-ui-react';
import IconButton from '@material-ui/core/IconButton';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { updateShoppingCart } from '../../store/actions/user';
import { addProductToShoppingCartInDB } from '../../utils/userUtils';
import defaultImg from '../../img/x.png'
import { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage } from '../../store/actions/user';
import { connect } from "react-redux";
import addToCartIcon from '../../img/icons/add to cart.png'


const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 160
  },

});

const Product = (props) => {
  useEffect(() => {
    let id = localStorage.getItem("user");
    if (id && props.currentUser == null) {
      let a_id = localStorage.getItem("currentAuction");
      if (a_id) props.setCurrentAuctionByStorage(a_id);
      props.setUserByStorage(id);
    }
  }, [])

  const [open, setOpen] = React.useState(false)
  const classes = useStyles();
  let [cnt, setCnt] = useState(0);
  let image_src = props.product.image || defaultImg;//TODO לשים תמונה סתם
  let description = props.product.description;
  let name = props.product.name;
  let price = props.product.price;

  return (
    <Modal
      closeIcon
      open={open}
      trigger={
        <Card className={classes.root, "product-in-list"} >

          <center style={{ color: "#262b96" }}>{name}</center>
          <Typography gutterBottom variant="h5" component="h2" style={{ color: "#262b96" }}>{price + "$"}</Typography>
          <CardMedia className={classes.media} image={image_src} title={name} />



          <div className={"qty-container"}>

            <IconButton color="primary" onClick={(e) => { let c = cnt; if (cnt > 0) setCnt(c - 1); e.stopPropagation(); }} style={{ color: "#262b96" }} >-</IconButton>

            <h2 style={{ display: "inline-block", fontSize: '2.6vh', color: "#262b96" }}>{cnt}</h2>

            <IconButton color="primary" onClick={(e) => { let c = cnt; setCnt(c + 1); e.stopPropagation() }} style={{ color: "#262b96" }}>+</IconButton>

            <IconButton color="primary" aria-label="add to shopping cart" id="add-to-cart-btn" onClick={(e) => {
              e.stopPropagation();
              addProductToShoppingCartInDB(props.currentAuction._id, props.currentUser._id, props.product._id, cnt).then(succ => {
                if (succ.status != 400) {
                  props.updateShoppingCart(succ.data);
                  setCnt(0);
                }
              })
            }}>
              <img src={addToCartIcon} className={"icon-in-product-card"} />
            </IconButton>
          </div>

        </Card>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >

      <Header ><h1 style={{color:"#262b96"}}>{name}</h1></Header>
      <Modal.Content><img src={image_src} style={{ width: '30%', height: 'auto' }} /><div style={{ marginLeft: '2vw', marginTop: '2vh', overflowWrap: 'break-word',color:"#262b96" }}>{description}</div></Modal.Content>

    </Modal>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    currentAuction: state.currentAuction.currentAuction
  }
}
export default connect(mapStateToProps, { setNewAuctionByStorage, setCurrentAuctionByStorage, setUserByStorage, updateShoppingCart })(Product);
