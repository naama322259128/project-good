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
import { addProductToShoppingCartInDB, deleteProductFromShoppingCartInDB } from '../../utils/userUtils';
import deleteIcon from '../../img/icons/dustbin.png'
import { connect } from "react-redux";
import defaultImg from '../../img/‏‏picture.png'
import { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage } from '../../store/actions/user';

const useStyles = makeStyles({
    root: {
        maxWidth: 300,
    },
    media: {
        height: 160
    },
});

const ProductInCart = (props) => {
    const [open, setOpen] = React.useState(false)
    const classes = useStyles();
    useEffect(() => {
        let id = localStorage.getItem("user");
        if (id && props.currentUser == null) {
            let a_id = localStorage.getItem("currentAuction");
            if (a_id) props.setCurrentAuctionByStorage(a_id);
            props.setUserByStorage(id);
        }
    }, [])

    let image_src = props.productInCart.image || defaultImg;
    let description = props.productInCart.description;
    let name = props.productInCart.name;
    let price = props.productInCart.price;
    let qty = props.qty;
    let _id = props.productInCart._id;

    return (
        <Modal
            closeIcon
            open={open}
            trigger={
                <Card className={classes.root, "cart-product-in-list"} >

                    <center style={{ color: "#262b96" }}>{name}</center>
                    <Typography gutterBottom variant="h5" component="h2" style={{ color: "#262b96" }}>{price + "$"}</Typography>
                    <CardMedia className={classes.media} image={image_src} title={name} />


                    <div className={"qty-container"}>

                        <IconButton
                            color="primary"
                            style={{ color: "#262b96" }}
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteProductFromShoppingCartInDB(props.currentAuction._id, props.currentUser._id, _id, 1).then(succ => {
                                    if (succ.status != 400) props.updateShoppingCart(succ.data);
                                })
                            }} >-
                        </IconButton>

                        <h2 style={{ display: "inline-block", fontSize: '2.6vh', color: "#262b96" }}>{qty}</h2>

                        <IconButton
                            style={{ color: "#262b96" }}
                            color="primary"
                            onClick={(e) => {
                                e.stopPropagation();
                                addProductToShoppingCartInDB(props.currentAuction._id, props.currentUser._id, _id, 1).then(succ => {
                                    if (succ.status != 400) props.updateShoppingCart(succ.data);
                                })
                            }}>+
                        </IconButton>

                        <IconButton
                            color="primary"
                            aria-label="delete from shopping cart"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteProductFromShoppingCartInDB(props.currentAuction._id, props.currentUser._id, _id, qty).then(succ => {
                                    if (succ.status != 400) props.updateShoppingCart(succ.data);
                                })
                            }}>
                            <img src={deleteIcon} className="my_icon" />
                        </IconButton>
                    </div>

                </Card>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >

            <Header ><h1 style={{ color: "#262b96" }}>{name}</h1></Header>
            <Modal.Content>
                <img src={image_src} style={{ width: '30%', height: 'auto' }} />
                <div style={{ marginLeft: '2vw', marginTop: '2vh', overflowWrap: 'break-word', color: "#262b96" }}>{description}</div>
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
export default connect(mapStateToProps, { setNewAuctionByStorage, setCurrentAuctionByStorage, setUserByStorage, updateShoppingCart })(ProductInCart);
