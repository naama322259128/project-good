// import './Auction.scss';
// import { Header, Modal } from 'semantic-ui-react';
// import p from '../../img/car.jpg';
// import IconButton from '@material-ui/core/IconButton';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
// import Typography from '@material-ui/core/Typography';
// import { connect } from "react-redux";
// import Button from '@material-ui/core/Button';
// import { deleteProductFromCart } from '../../store/actions/user';
// import { setCntOfProductInCart } from '../../store/actions/currentAuction';
// import React, { useEffect, useState } from 'react';

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 300,
//   },
//   media: {
//     height: 160,
//   },
// });

// const getCnt = (_id) => {
//   let arr = JSON.parse(localStorage.getItem("shoppingCart"));
//   if (!arr) return 0;
//   let index = arr.findIndex(item => item.product_id == _id);
//   if (index != -1)
//     return arr[index].cnt;
//   return 0;
// }

// const ProductInCart = (props) => {
//   const [open, setOpen] = React.useState(false)
//   const classes = useStyles();

//   let image_src = p;//עד שנעשה את הקטע של התמונות
//   let description = props.item.product.description;
//   let name = props.item.product.name;
//   let price = props.item.product.prices;
//   let _id = props.item.product._id;

//   return (
//     <Modal
//       closeIcon
//       open={open}
//       trigger={
//         <Card className={classes.root} >
//           {name}
//           <Typography gutterBottom variant="h5" component="h2">
//             {price}
//           </Typography>
//           <CardMedia
//             className={classes.media}
//             image={image_src}
//             title="Contemplative Reptile"
//           />

//           <i className="trash icon" onClick={(e) => { e.stopPropagation(); props.deleteProductFromCart(_id) }}></i>
//           <IconButton color="primary"
//             onClick={(e) => {
//               let c = getCnt(_id);
//               if (c > 0) props.setCntOfProductInCart(_id, c - 1);
//               e.stopPropagation();
//             }}  >
//             -</IconButton>
//           <h2>{getCnt()}</h2>
//           <IconButton color="primary"
//             onClick={(e) => {
//               let c = getCnt(_id);
//               props.setCntOfProductInCart(_id, c + 1);

//               e.stopPropagation();
//             }}
//           >+</IconButton>
//         </Card >}
//       onClose={() => setOpen(false)}
//       onOpen={() => setOpen(true)}
//     >

//       <Header ><h1>{name}</h1></Header>
//       <Modal.Content>
//         {description}<br />
//         <img src={image_src}></img>
//       </Modal.Content>
//     </Modal >
//   )
// }

// const mapStateToProps = state => {
//   return {
//     currentUser: state.user.currentUser,
//     loginIsOpen: state.user.loginIsOpen,
//     currnetAuction: state.auction
//   }
// }
// export default connect(mapStateToProps, { deleteProductFromCart, })(ProductInCart);

import './Cart.scss';
import { Header, Modal } from 'semantic-ui-react';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { updateShoppingCart } from '../../store/actions/user';
import { addProductToShoppingCartInDB } from '../../utils/userUtils';

import { connect } from "react-redux";
import defaultImg from '../../img/picture.png'

const useStyles = makeStyles({
    root: {
        maxWidth: 300,
    },
    media: {
        height:160
    },
});

const ProductInCart = (props) => {
    const [open, setOpen] = React.useState(false)
    const classes = useStyles();

    let image_src = props.productInCart.image || defaultImg;
    let description = props.productInCart.description;
    let name = props.productInCart.name;
    let price = props.productInCart.prices;
    let qty = props.qty;


    return (
        <Modal
            closeIcon
            open={open}
            trigger={
                <Card className={classes.root, "cart-product-in-list"} >

                    <center>{name}</center>
                    <Typography gutterBottom variant="h5" component="h2">{price}</Typography>
                    <CardMedia className={classes.media} image={image_src} title={name} />
                    <IconButton color="primary" onClick={(e) => { e.stopPropagation(); }}  >-</IconButton>
                    <h2 style={{ display: "inline-block", fontSize: '2vh' }}>{qty}</h2>
                    <IconButton color="primary" onClick={(e) => { e.stopPropagation(); }}>+</IconButton>

                    {/* מחיקה מהסל */}
                    <IconButton color="primary" aria-label="delete from shopping cart">
                        <AddShoppingCartIcon
                            onClick={(e) => {
                                e.stopPropagation();
                                //delete
                                alert("וגם לשנות את האייקון! deleted!!")
                            }} />
                    </IconButton>


                </Card>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >

            <Header ><h1>{name}</h1></Header>
            <Modal.Content>
                <img src={1}  style={{width:'30%',height:'auto'}}/>
                <div style={{ marginLeft: '2vw', marginTop: '2vh', overflowWrap: 'break-word' }}>{description}</div>
            </Modal.Content>

        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser,
        currentAuction: state.currentAuction.currentAuction
    }
}
export default connect(mapStateToProps, { updateShoppingCart })(ProductInCart);
