import React, {useEffect, useRef} from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { isBrowser } from 'react-device-detect';
import {CommentIcon, RepoForkedIcon, FileCodeIcon} from '@primer/octicons-react'
import {
  selectStatus,
  searchGistsAsync,
} from '../searchSlice';
import {Fork} from './Fork';
import NoRecords from './NoRecords';
import Spinner from './Spinner';

function GistChild(props) {
  const { row } = props;
  const [openForks, setOpenForks] = React.useState(false);
  const [openFileList, setOpenFileList] = React.useState(false);
  const createdDate = row.created_at ? new Date(row.created_at) : '';
  const updatedDate = row.updated_at ? new Date(row.updated_at) : '';
  const description = row.description && row.description.indexOf(" ") === -1 && row.description.length > 30 ? row.description.slice(0,30)+"..." : row.description;
  const languages = []

  for (const index in row.files) {
    let lang = row.files[index].language;
    if(lang && !languages.includes(lang))
      languages.push(row.files[index].language)
  }

  return (
    <React.Fragment>
      <Card sx={{ minWidth:isBrowser ? 750 : 250, maxWidth: 750, marginBottom: 1}} >
        <CardHeader
          avatar={
            <Link href={row.owner.html_url}>
              <Avatar alt={row.owner.login.slice(0,1)} src={row.owner.avatar_url}  />
            </Link>
          }
          action={
            <Stack direction="row" spacing={2}>
              <Link component="button" underline="none" onClick={() => setOpenFileList(!openFileList)}>
                <Stack direction="row" spacing={1}>
                <Typography sx={{ fontSize: 10 }} color="text.secondary">
                {row.comments} 
                </Typography>
                <Typography sx={{ fontSize: 10 }} color="text.secondary">
                  <CommentIcon size={16} />
                </Typography>
                {
                  isBrowser && 
                  <Typography sx={{ fontSize: 10 }} color="text.secondary">
                  Comments
                  </Typography>
                }
                </Stack>
              </Link>
              <Link component="button" underline="none" onClick={() => setOpenFileList(!openFileList)}>
                <Stack direction="row" spacing={1}>
                <Typography sx={{ fontSize: 10 }} color="text.secondary">
                {languages.length}
                </Typography>
                <Typography sx={{ fontSize: 10 }} color="text.secondary">
                <FileCodeIcon size={16} />
                </Typography>
                {
                  isBrowser && 
                  <Typography sx={{ fontSize: 10 }} color="text.secondary">
                  Files
                  </Typography>
                }
                </Stack>
              </Link>
              <Link component="button" underline="none" onClick={() => setOpenForks(!openFileList)}>
                <Stack direction="row">
                <RepoForkedIcon size={16} />
                {
                  isBrowser && 
                  <Typography sx={{ fontSize: 10 }} color="text.secondary">
                  Forks
                  </Typography>
                }
                </Stack>
              </Link>
              </Stack>
                    
            }
            title={row.owner.login}
            subheader={
              (
                <Stack direction= {"row" } spacing={1}>
                  <Stack direction= { isBrowser ? "row" : "column" }>
                  <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                    Created:
                  </Typography>
                  <Typography sx={{ fontSize: 10 }} color="text.secondary">
                    {createdDate.toDateString()}
                  </Typography>
                  </Stack>
                  <Stack direction= { isBrowser ? "row" : "column" }>
                  <Typography sx={{ fontSize: 10 }} color="text.secondary">
                    Last updated:
                  </Typography>
                  <Typography sx={{ fontSize: 10 }} color="text.secondary">
                    {updatedDate.toDateString()}
                  </Typography>
                  </Stack>
                  
                  
                </Stack>
              )
            }
          /> 
              <CardContent>
                <Typography variant="body2">
                  {description || 'No Description'}
                </Typography>
              </CardContent>
              <CardActions>
              <Stack
                direction="row"
                // divider={<Divider orientation="horizontal" flexItem />}
                spacing={2} >
                {
                  languages.map((lang)=>{
                    return <Chip key={lang} label={lang} variant="outlined" />
                  })
                }
                </Stack>
              </CardActions>
          </Card>
          {openForks && (<Fork open={openForks} onClose={setOpenForks} gistId={row.id}/>)}
    </React.Fragment>
  );
}

export default function Gist(props) {
  const {gists} = props;
  const isInitialMount = useRef(true);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = React.useState(1);
  const apiStatus = useSelector(selectStatus);

  useEffect(()=>{
    if (isInitialMount.current) {
      isInitialMount.current = false;
   } else {
    dispatch(searchGistsAsync([gists[0].owner.login, currentPage]));
   }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentPage,dispatch])

  if(apiStatus === 'loading-gists')
    return (<Spinner/>);
  if(gists && gists.length === 0){
    return(<NoRecords message='No gists found for the user'/>);
  }

  return (
    <Paper>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item >
          {gists && gists.map((row) => (
                    <GistChild key={row.id} row={row} />
                  ))}
        </Grid>
      </Grid>
      <BottomNavigation
        showLabels
        onChange={(event, value) => {
          switch(value){
            case 0:
              setCurrentPage(currentPage-1);
              break;
            case 1:
              setCurrentPage(currentPage+1);
              break;
            default:
              break;
          }
        }}
      >
        {currentPage!==1 && <BottomNavigationAction disabled={currentPage===1} label="Back" icon={<ArrowBackIosIcon />} /> }
        <BottomNavigationAction disabled={gists && gists.length < 30} label="Next" icon={<ArrowForwardIosIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
