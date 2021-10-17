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
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import './User.scss';
//לטבלה
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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
  let [details, setDetails] = useState([]);
  let [gifts, setGifts] = useState([]);
  useEffect(() => {
    getWinnersList("615dcef171ffd48b48935b38"/*props.order.auctionId*/).then(succ => { setWinnersList(succ.data); })
    getOrderDetails("615dd49e71ffd48b48935b3c"/*props.order._id*/).then(succ => {
      let arr = [];
      //succ.data.orderDetails.map(item => { arr.push({product:}) })
      console.log(details);
      setGifts(succ.data.giftCodes);
    })

  }, []);








//לטבלה
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
  ];





//לחלון שנפתח למטה

  const [state, setState] = React.useState({
    bottom: false
});

const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
    }

    setState({ ...state, [anchor]: open });
};

const list = (anchor) => (
    <Box
        sx={{ width: anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
    >

    {/* לטבלה */}
         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
);

  return (
    <div>
      {/* לחלון שנפתח למטה */}
        <div>
            {['bottom'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>{'Order details'}</Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment> 
             ))}   
        </div>


        
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
        <Typography sx={{ p: 2 }}>
          <table>
            <th>Order details:</th>
            {details.map(item => { return <tr><td>{item.product}</td><td>* {item.ticketsQuantity}</td></tr> })}
            <th>Order gifts:</th>
            <tr>{gifts.map(item => { return <td>{item}</td> })}</tr>
          </table>
        </Typography>
      </Popover>
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
