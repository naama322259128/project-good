import React, { useEffect, useState } from "react";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { getOrderDetailsFromDB } from '../../utils/orderUtils'
import { getAuctionWithWinnersFromDB } from '../../utils/auctionUtils'
import { getAuctionIsDoneFromDB } from '../../store/actions/auctionManager';
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

  let [productsList, setProductsList] = useState([]);
  let [details, setDetails] = useState([]);
  let [gifts, setGifts] = useState([]);
  let [status, setStatus] = useState("");

  useEffect(() => {

    getAuctionWithWinnersFromDB(props.order.auctionId._id).then(succ => {
      setProductsList(succ.data.productList);//רשיתמ מוצרים עם הזוכים של מכירה זו
      setStatus(succ.data.status);
    });

    setDetails(props.order.orderDetails);//פרטי הזמנה זו
    setGifts(props.order.giftCodes)//מתנות של הזמנה זו
  }, []);

  return (
    <div>
      <OrderDetails details={details} gifts={gifts} />
      <IconButton aria-describedby={id} variant="contained" onClick={handleClick} disabled={status == "DONE"}><img title="Chiense auction results" className="table_options_icon" src={results} /></IconButton>
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
        <Typography sx={{ p: 2 }}>{
          productsList.map((p, index) => { return <p key={index}>{p.name}:{p.winnerId.confidentiality ? "Anonymous" : p.winnerId.userName}</p> }
          )
        }

        </Typography>
      </Popover>

    </div>
  );
}


    //מה שהפונ של רשימת זוכים מחזירה
/*{
        "registrationStartDate": "2022-01-03T22:00:00.000Z",
      "status": "NOT_DONE",
      "lotteryApproval": true,
      "organizationPhotos": [],
      "publicationApproval": true,
      "_id": "615dcef171ffd48b48935b38",
      "name": "מצילים חיים",
      "auctionManager": "222",
      "lotteriesDate": "2025-10-04T21:00:00.000Z",
      "registrationEndDate": "2025-09-04T21:00:00.000Z",
      "purchasePackage": [],
      "productList": [
      {
        "includedInPackages": true,
      "   _id": "616c71c3e0eed5f333585a86",
          "winnerId": {
        "confidentiality": false,
      "_id": "616b3feeaea25e30d4c2d118",
      "userName": "Noam"
  },
  "name": "car"
},
      {
        "includedInPackages": true,
      "_id": "616c72908c4a971c882b8c7a",
      "name": "gold",
          "winnerId": {
        "confidentiality": false,
      "_id": "616b3feeaea25e30d4c2d118",
      "userName": "Noam"
  }
},
      {
        "includedInPackages": true,
      "_id": "616c72c28c4a971c882b8c7b",
      "name": "cow",
          "winnerId": {
        "confidentiality": false,
      "_id": "611c2f2e18f13934fc07bc27",
      "userName": "Michal"
  }
}
],
"organizationName": "עזר מציון",
"organizationText": "ארגון חסד מציל חיים",
"terms": ""
}*/