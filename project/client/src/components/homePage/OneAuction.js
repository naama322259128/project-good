import './home.scss';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import React, { useEffect, useState } from 'react';
import defaultLogo from '../../img/defaultLogo.jpg'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',

  },
  image: {
    position: 'relative',
    height: 250,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '3px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 20,
    right: 20,
    top: 15,
    bottom: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 20,
    right: 20,
    top: 10,
    bottom: 10,
    backgroundSize: 'cover',
    backgroundPosition: 'center 27%',
  },
  //רקע
  imageBackdrop: {
    position: 'absolute',
    left: 20,
    right: 20,
    top: 10,
    bottom: 10,
    // backgroundColor: theme.palette.common.black,
    // opacity:0.6,
    transition: theme.transitions.create('opacity'),
  },
  //הכיתוב
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    fontSize:'2.8vh',
    textShadow: '-0.6px 0 black, 0 0.6px black, 0.6px 0 black, 0 -0.6px black'
  },
  //הפס שנמצא מתחת הכיתוב בכל תמונה
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const OneAuction = (props) => {
  const classes = useStyles();
  return (<>
    <ButtonBase
      focusRipple
      key={props.item.name}
      className={classes.image}
      focusVisibleClassName={classes.focusVisible}
      style={{
        width: '100%',

      }}
    >
      <span
        className={classes.imageSrc}
        style={{
          backgroundImage: `url('${props.item.logo||defaultLogo}')`,
          backgroundSize: '100%'
        }}
      />
      <span className={classes.imageBackdrop} />
      <span className={classes.imageButton}>
        <Typography
          component="span"
          variant="subtitle1"
          color="inherit"
          className={classes.imageTitle}
        >
          {props.item.name}
          <span className={classes.imageMarked} />
        </Typography>
      </span>
    </ButtonBase>

  </>
  )
}
const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    loginIsOpen: state.user.loginIsOpen
  }
}
export default connect(mapStateToProps, {})(OneAuction);

