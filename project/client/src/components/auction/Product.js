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
import { connect } from "react-redux";
import React, { useEffect } from 'react';
import { updateCurrentAuction } from '../../store/actions/currentAuction'
import { useStorageReducer } from 'react-storage-hooks';
import { currentAuctionReducer as reducer, initialState as currentAuctionState } from '../../store/reducers/currentAuctionState'
import * as actionTypes from '../../store/actionTypes'

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 160,
  },
});

const Product = (props) => {

  const [state, dispatch, writeError] = useStorageReducer(
    localStorage,
    'currentAuction',
    reducer,
    currentAuctionState
  );

  const [open, setOpen] = React.useState(false)
  const classes = useStyles();
  let [cnt, setCnt] = useState(0);
  let image_src = p;//עד שנעשה את הקטע של התמונות
  let description = props.item.description;
  let name = props.item.name;
  let price = props.item.prices;

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
          {/* הוסף לסל */}
          <IconButton color="primary" aria-label="add to shopping cart">
            <AddShoppingCartIcon
              onClick={(e) => {
                e.stopPropagation();
                dispatch({
                  type: actionTypes.ADD_PRODUCT_TO_CART,
                  payload: { cnt: cnt, product: props.item }
                });
                setCnt(0);
              }} />
          </IconButton>

          <IconButton color="primary" onClick={(e) => { let c = cnt; if (cnt > 0) setCnt(c - 1); e.stopPropagation(); }}  >-</IconButton>

          <h2>{cnt}</h2>

          <IconButton color="primary" onClick={(e) => { let c = cnt; setCnt(c + 1); e.stopPropagation(); }}>+ </IconButton>

        </Card>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >

      <Header ><h1>{name}</h1></Header>
      <Modal.Content>
        {description}<br />
        <img src={image_src}></img>
      </Modal.Content>
    </Modal>
  )
}


export default connect(null, { updateCurrentAuction })(Product);