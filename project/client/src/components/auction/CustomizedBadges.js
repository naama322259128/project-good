import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { connect } from "react-redux";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function CustomizedBadges(props) {

  const [cnt, setCnt] = React.useState(0);

  React.useEffect(() => {
    if (props.arr) {
      let count = 0;
      props.arr.map(item => count += item.qty);
      setCnt(count)
    }
  }, [props.currentAuction, props.arr])


  return (
    <IconButton aria-label="cart" style={{marginLeft:'1.5vw'}} onClick={() => window.location.replace("http://localhost:3000/auction/cart")}>
      <StyledBadge badgeContent={cnt} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}
const mapStateToProps = state => {
  return {
    arr: state.user.shoppingCartOfCurrentAuction,
    currentAuction: state.currentAuction.currentAuction
  }
}
export default connect(mapStateToProps, {})(CustomizedBadges);

