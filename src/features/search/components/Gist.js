import React, {useEffect, useRef} from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
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
import {Comments} from './Comments';
import NoRecords from './NoRecords';
import Spinner from './Spinner';
import IconButton from '@mui/material/IconButton';

function GistChild(props) {
  const { row } = props;
  const [openForks, setOpenForks] = React.useState(false);
  const [openCommentList, setOpenCommentList] = React.useState(false);
  const createdDate = row.created_at ? new Date(row.created_at) : '';
  const updatedDate = row.updated_at ? new Date(row.updated_at) : '';
  const description = row.description && row.description.indexOf(" ") === -1 && row.description.length > 30 ? row.description.slice(0,30)+"..." : row.description;
  const languages = []
  let fileCount=0;
  for (const index in row.files) {
    fileCount++;
    let lang = row.files[index].language;
    if(lang && !languages.includes(lang))
      languages.push(row.files[index].language)
  }

  return (
    <React.Fragment>
      <Card className="gist-card"sx={{ minWidth:isBrowser ? 750 : "100vw", maxWidth: isBrowser ? 750 : "100vw", marginBottom: 1}} >
        <CardHeader
          avatar={
            <Link href={row.owner.html_url}>
              <Avatar alt={row.owner.login.slice(0,1)} src={row.owner.avatar_url}  />
            </Link>
          }
          action={
            <Stack direction="row" spacing={2}>
              <Link component="button" underline="none" disabled = {row.comments===0} onClick={() => {if(row.comments)setOpenCommentList(!openCommentList)}}>
                <Stack direction="row" spacing={1}>
                <Typography sx={{ fontSize: 10 }} color="#0072E5">
                {row.comments} 
                </Typography>
                <Typography sx={{ fontSize: 10 }} color="#0072E5">
                  <CommentIcon size={16} />
                </Typography>
                {
                  isBrowser && 
                  <Typography sx={{ fontSize: 10 }} color="#0072E5">
                  Comments
                  </Typography>
                }
                </Stack>
              </Link>
              <Link component="button" underline="none" onClick={() => window.open(row.html_url, "_blank")}>
                <Stack direction="row" spacing={1}>
                <Typography sx={{ fontSize: 10 }} color="#0072E5">
                {fileCount}
                </Typography>
                <Typography sx={{ fontSize: 10 }} color="#0072E5">
                <FileCodeIcon size={16} />
                </Typography>
                {
                  isBrowser && 
                  <Typography sx={{ fontSize: 10 }} color="#0072E5">
                  Files
                  </Typography>
                }
                </Stack>
              </Link>
              <Link component="button" underline="none" onClick={() => setOpenForks(!openForks)}>
                <Stack direction="row">
                <Typography sx={{ fontSize: 10 }} color="#0072E5">
              <RepoForkedIcon size={16} />
              </Typography>
                {
                  isBrowser && 
                  <Typography sx={{ fontSize: 10 }} color="#0072E5">
                  Forks
                  </Typography>
                }
                </Stack>
              </Link>
              </Stack>
                    
            }
            title={
              <Link underline="none" color="#0072E5" href={row.owner.html_url}>
                {row.owner.login}
              </Link>
              
            }
            
          /> 
              <CardContent className="dateTimeDiv">
                <Typography variant="div">
                <Stack direction= {"row" } spacing={1}>
                  <Stack direction= "row">
                  <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                    Created:
                  </Typography>
                  <Typography sx={{ fontSize: 10 }} color="text.secondary">
                    {createdDate.toDateString()}
                  </Typography>
                  </Stack>
                  <Stack direction= "row">
                  <Typography sx={{ fontSize: 10 }} color="text.secondary">
                    Last updated:
                  </Typography>
                  <Typography sx={{ fontSize: 10 }} color="text.secondary">
                    {updatedDate.toDateString()}
                  </Typography>
                  </Stack>
                </Stack>
                </Typography>
                </CardContent>
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
                    return <Chip className="gist-lang-chip" key={lang} label={lang} variant="outlined" />
                  })
                }
                </Stack>
              </CardActions>
          </Card>
          {openForks && (<Fork open={openForks} onClose={setOpenForks} gistId={row.id}/>)}
          {openCommentList && (<Comments open={openCommentList} onClose={setOpenCommentList} gistId={row.id}/>)}
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
        sx={{ marginBottom: 6 }}
      >
        <Grid item >
          {gists && gists.map((row) => (
                    <GistChild key={row.id} row={row} />
                  ))}
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 50, backgroundColor:"white", }} elevation={3}
        direction="row"
      >
      <Grid item xs={6} >
      <Grid container justifyContent="flex-start">
          <IconButton 
            disabled ={currentPage===1}
            onClick={()=>setCurrentPage(currentPage-1)}>
            <ArrowBackIosIcon />
          </IconButton>
        </Grid>
      </Grid>
        
        <Grid item xs={6} >
         <Grid container justifyContent="flex-end">
          <IconButton 
            disabled ={gists && gists.length < 30}
            onClick={()=>setCurrentPage(currentPage+1)}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
