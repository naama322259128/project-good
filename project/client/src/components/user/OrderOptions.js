import React, { useEffect, useState } from "react";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { getOrderDetails } from '../../utils/orderUtils'
import { getWinnersList } from '../../utils/auctionUtils'
import { getAuctionIsDone } from '../../store/actions/auctionManager';
import IconButton from '@material-ui/core/IconButton';
import results from '../../img/icons/results.png'
import viewOrder from '../../img/icons/view-order.png'
import add from '../../img/icons/add-order.png'
import { Item } from "semantic-ui-react";
import { getInputAdornmentUtilityClass } from "@mui/material";
import OrderDetails from './OrderDetails'
export default function OrderOptions(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  let [winnersList, setWinnersList] = useState([]);
  let [details, setDetails] = useState([]);
  let [gifts, setGifts] = useState([]);
  useEffect(() => {
    getWinnersList("615dcef171ffd48b48935b38"/*props.order.auctionId*/).then(succ => { setWinnersList(succ.data); })
    getOrderDetails("615dd49e71ffd48b48935b3c"/*props.order._id*/).then(succ => {
      // let arr = [];
      // succ.data.orderDetails.map(item => { arr.push({product:}) })
      // console.log(details);
      // setGifts(succ.data.giftCodes);
    })

  }, []);

  return (
    <div>
      <OrderDetails details={[{ticketsQuantity:5,product:"car"},{ticketsQuantity:40,product:"ball"}]} gifts={["dall","cow"]}/>
      <IconButton aria-describedby={id} variant="contained" onClick={handleClick} /*disabled={getAuctionIsDone(props.order.auctionId) == false}*/><img title="Chiense auction results" className="table_options_icon" src={results} /></IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>{winnersList.map((item, index) => { return <p key={index}>{item.productName}: {item.winnerName}</p> })}</Typography>
      </Popover>
      <IconButton><img title="Add order" className="table_options_icon" src={add} /></IconButton>
    </div>
  );
}
