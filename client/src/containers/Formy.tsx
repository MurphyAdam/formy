import React, { lazy, useState, useEffect } from 'react';
import { Grid, Box, Typography, TextField, makeStyles } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import { useDebounce } from 'use-debounce';
import { CircularLoader } from "../components/Common/Loaders";
import { getPlaces } from "../redux/actions/places";
import { PlaceObjectProps } from "../types/places";

// we use lazy loading to load out PlaceView component
const PlaceView = lazy(() => import('../components/PlaceView'));

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
    },
    titleTypo: {
        padding: theme.spacing(1)
    },
    textField: {
        width: "350px",
    },
    notchedOutline: {
        borderWidth: "1px",
        borderColor: "grey !important"
    },
    resultsCountTypo: {
        padding: theme.spacing(2),
    }
}))

const mapStateToProps = (state: any) => {
    return {
      placesState: state.places,
    };
  };
  
  const mapDispatchToProps = (dispatch: any) => {
    return {
        searchPlaces: (params: object) => dispatch(getPlaces(params))
    };
  };
  
  const connector = connect(mapStateToProps, mapDispatchToProps);
  // we use ConnectedProps to infere types from redux state
  type FormyProps = ConnectedProps<typeof connector>;

const Formy: React.FC<FormyProps> = (props) => {

    const { searchPlaces, placesState } = props;
    const { isLoading, isLoaded, isError, places, count, error } = placesState;
    const classes = useStyles();
    const [query, setQuery] = useState<string>('');
    const [debouncedQuery] = useDebounce(query, 1000);
    const [reqTime, setReqTime] = useState<number>(0);
    const [responseTime, setResponseTime] = useState<number>(0);

    useEffect(() => {
        if(debouncedQuery !== '') {
            searchPlaces({q: debouncedQuery});
        }
    }, [debouncedQuery, searchPlaces])

    useEffect(() => {
        if(isLoading) {
            const reqTime = (new Date()).getTime();
            setReqTime(reqTime);
        }
        if(isLoaded) {
            const resTime = (new Date()).getTime();
            const milliseconds = resTime - reqTime;
            setResponseTime(milliseconds);
        }
    }, [isLoading, isLoaded, reqTime])

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" 
                        alignItems="center"
                        justifyContent="center">
                        <TextField type="text" 
                            variant="outlined" 
                            className={classes.textField}
                            InputProps={{
                                classes: {
                                  notchedOutline: classes.notchedOutline
                                }
                              }}
                            placeholder="Start typing to search..."
                            value={query} 
                            onChange={e => setQuery(e.target.value)} />
                    </Box>
                </Grid>
                {isLoading
                    &&
                    (
                        <Grid item xs={12}>
                            <CircularLoader />
                        </Grid>
                    )

                }
                {isLoaded &&
                    !!count
                    // count = places array is not empty: we have results
                    ?
                    (
                        <React.Fragment>
                            <Typography variant="body1" 
                                className={classes.resultsCountTypo}>
                               About {count} results ({responseTime} ms)
                            </Typography>
                            <React.Suspense
                                fallback="Please wait while we load a place for your data..."
                            >
                                {places.map((place: PlaceObjectProps) => {
                                    return (
                                        <PlaceView key={place.place_id} place={place} />
                                    )})
                                }
                            </React.Suspense>
                        </React.Fragment>
                    ):
                    // count: places array is empty: no results
                    // we only display that there are no results only if 
                    // we are not awaiting any responses
                    !isLoading &&
                        (
                            <Grid item xs={12}>
                                <Typography variant="h6"
                                    component="h2"
                                    align="center"
                                    className={classes.titleTypo}
                                >
                                    No results for {query}
                                </Typography>
                                <Typography
                                    align="center"
                                >
                                    {error}
                                </Typography>
                            </Grid>
                        )
                }
                {/* 
                    // we only dispaly an error when:
                        - isError is true
                        - and isLoading is false
                */}
                {(!isLoading && isError) &&
                    (
                        <Grid item xs={12}>
                            <Typography variant="h6"
                                component="h2"
                                align="center"
                                className={classes.titleTypo}
                            >
                                Something went wrong
                            </Typography>
                            <Typography
                                align="center"
                            >
                                {error}
                            </Typography>
                        </Grid>
                    )
                }
            </Grid>
        </div>
    )
}

export default connector(Formy);