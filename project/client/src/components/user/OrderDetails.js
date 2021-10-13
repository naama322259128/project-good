import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {getWinnersList} from '../../utils/auctionUtils'
import{getAuctionIsDone}from  '../../store/actions/auctionManager';
export default function OrderDetails(props) {
  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const open1 = Boolean(anchorEl1);
  const id1 = open1? 'simple-popover' : undefined;

  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id1} variant="contained" onClick={handleClick1}>
        View order
      </Button> 
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
        <Typography sx={{ p: 2 }}><table>{props.item._id}</table></Typography>
      </Popover>  
      <Button aria-describedby={id} variant="contained" onClick={handleClick} disabled={getAuctionIsDone(props.item.auctionId)==false}>
      Lottery results 
      </Button>
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
        <Typography sx={{ p: 2 }}>{getWinnersList(props.item.auctionId).then(succ=>succ.data)}</Typography>
      </Popover>
    </div>
  );
}
