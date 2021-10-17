import React, { useEffect, useState } from "react";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { getWinnersList } from '../../utils/auctionUtils'
import { getAuctionIsDone } from '../../store/actions/auctionManager';
import IconButton from '@material-ui/core/IconButton';
import results from '../../img/icons/results.png'
import viewOrder from '../../img/icons/view-order.png'
import add from '../../img/icons/add-order.png'
import { Item } from "semantic-ui-react";
import { getInputAdornmentUtilityClass } from "@mui/material";

export default function OrderOptions(props) {
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const handleClick1 = (event) => { setAnchorEl1(event.currentTarget); };
  const handleClose1 = () => { setAnchorEl1(null); };
  const open1 = Boolean(anchorEl1);
  const id1 = open1 ? 'simple-popover' : undefined;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  let [winnersList, setWinnersList] = useState([]);
  useEffect(() => { getWinnersList("615dcef171ffd48b48935b38"/*props.order.auctionId*/).then(succ => { setWinnersList(succ.data); }) }, []);

  return (
    <div>
      <IconButton aria-describedby={id1} variant="contained" onClick={handleClick1}><img title="Order details" className="table_options_icon" src={viewOrder} /></IconButton>
      <Popover
        id={id1}
        open={open1}
        anchorEl={anchorEl1}
        onClose={handleClose1}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}><table>{props.order._id}</table></Typography>
      </Popover>
      <IconButton aria-describedby={id} variant="contained" onClick={handleClick} /*disabled={getAuctionIsDone(props.order.auctionId) == false}*/><img title="Auction results" className="table_options_icon" src={results} /></IconButton>
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
