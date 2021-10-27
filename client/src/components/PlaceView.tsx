import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import WorkIcon from '@material-ui/icons/Work';
import MapIcon from '@material-ui/icons/Map';
import { PlaceObjectProps } from '../types/places';

const useStyles = makeStyles((theme) => ({
    subheader: {
        padding: theme.spacing(1, 0)
    },
    description: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem !important',
        },
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        WebkitLineClamp: 4,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
    },
    title: {
        textDecoration: 'none'
    },
    chip: {
        margin: theme.spacing(1),
    },
    blackColor: {
        color: 'black',
    }
}));


interface PlaceViewProps {
    place: PlaceObjectProps
}

const PlaceView: React.FC<PlaceViewProps> = (props) => {

    const { place } = props;
    const classes = useStyles();

    const lat = place.geometry.location.lat;
    const lng = place.geometry.location.lng;
    const location = `${lat} - ${lng}`

    const businessStatus = !!place.business_status ? place.business_status : 'No business status';

    return (
        <Grid item xs={12} >
            <Card>
                <CardContent>
                    <Typography variant="h5"
                        color={'primary'}
                        className={classes.title}
                        gutterBottom>
                        {place.name}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        component="div"
                        variant="caption"
                        className={classes.subheader}
                    >
                        <Chip
                            className={classes.chip}
                            size="small"
                            icon={<MapIcon className={classes.blackColor} />}
                            label={`Location: ${location}`}
                        />
                        <Chip
                            className={classes.chip}
                            size="small"
                            id="business-status"
                            icon={<WorkIcon className={classes.blackColor} />}
                            label={`Business Status: ${businessStatus}`}
                        />
                    </Typography>
                    <Typography variant="body2"
                        className={classes.description}
                        component="p" >
                        Address: {place.formatted_address}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default PlaceView;