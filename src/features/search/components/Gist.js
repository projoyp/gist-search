import React, {useEffect, useRef} from 'react';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useDispatch, useSelector } from 'react-redux';
import { isBrowser } from 'react-device-detect';
import {
  selectStatus,
  searchGistsAsync,
} from '../searchSlice';
import {Fork} from './Fork';
import NoRecords from './NoRecords';
import Spinner from './Spinner';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const date = row.created_at ? new Date(row.created_at) : '';
  const description = row.description && row.description.indexOf(" ") === -1 && row.description.length > 30 ? row.description.slice(0,30)+"..." : row.description;
  const languages = []
  
  for (const index in row.files) {
    let lang = row.files[index].language;
    if(lang && !languages.includes(lang))
      languages.push(row.files[index].language)
  }
  
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
      
        <TableCell component="th" scope="row" sx={{ width: '15%' }}>
          <Grid container spacing={4}>
           <Grid item xs={4}>
            <Avatar alt={row.owner.login.slice(0,1)} src={row.owner.avatar_url} sx={{ width: 24, height: 24 }} />
          </Grid>
          <Grid item xs={4}>
            {row.owner.login}
          </Grid> 
          </Grid>
        </TableCell>
        { 
          isBrowser &&
          <TableCell sx={{ width: '40%' }} style={{whiteSpace: 'normal', wordWrap: 'break-word'}}>
            {description}
          </TableCell>
        }
        <TableCell sx={{ width: '20%' }}> 
          {languages.map((lang)=>{
            return <Chip key={lang} label={lang} variant="outlined" />
            })
          } 
        </TableCell>
        <TableCell sx={{ width: '15%' }}>{date.toDateString()}</TableCell>
        <TableCell>
          <IconButton
            value={row.id}
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            <UnfoldMoreIcon/>
          </IconButton>
        </TableCell>
      </TableRow>
      {open && (<Fork open={open} onClose={setOpen} gistId={row.id}/>)}
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
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '15%' }}> Owner</TableCell>
              {
                isBrowser && <TableCell sx={{ width: '40%' }} style={{whiteSpace: 'normal', wordWrap: 'break-word'}}> Description</TableCell>
              }
              <TableCell sx={{ width: '20%' }}> Tags</TableCell>
              <TableCell sx={{ width: '15%' }}> Created At</TableCell>
              <TableCell sx={{ width: '10%' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gists && gists.map((row) => (
              <Row key={row.id} row={row} />
            ))}
            
          </TableBody>
          
        </Table>
      </TableContainer>
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
        <BottomNavigationAction disabled={currentPage===1} label="Back" icon={<ArrowBackIosIcon />} />
        <BottomNavigationAction disabled={gists && gists.length < 30} label="Next" icon={<ArrowForwardIosIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
