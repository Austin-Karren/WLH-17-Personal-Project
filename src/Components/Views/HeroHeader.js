import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../Custom/Button';
import Typography from '../Custom/Typography';
import HeroLayout from './HeroLayout';

const backgroundImage =
  'https://ky-england-photo.s3.amazonaws.com/72f78b42-ea35-4fc0-972f-011249306029-cropped-kyliehyrumbridals-9371-5.jpg';

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function HeroHeader(props) {
  const { classes } = props;

  return (
    <HeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Ky England Photo
      </Typography>
      {/* <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        Enjoy secret offers up to -70% off the best luxury hotels every Sunday.
      </Typography> */}
      {/* <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href="/premium-themes/onepirate/sign-up/"
      >
        Register
      </Button> */}
      <Typography variant="body2" color="inherit" className={classes.more}>
        Based in SLC Utah
      </Typography>
    </HeroLayout>
  );
}

HeroHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeroHeader);