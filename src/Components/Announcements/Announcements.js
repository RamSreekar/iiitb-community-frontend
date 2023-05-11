import React, {useState, useEffect} from 'react'
import Sidebar from "./Sidebar";
import PropTypes from 'prop-types';
import CreateCard from "../Card/CreateCard";
import Card from "../Card/Card";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import {useParams} from 'react-router-dom';
import PostPopup from './PostPopup';
import LinearProgress from '@mui/material/LinearProgress';
import "./Announcements.css";
import { makeStyles} from '@mui/styles';
import image from "../../Images/Time Table.png";
import image2 from "../../Images/NAAC A+.jpeg";
import {api} from "../../api";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div className="tabpanel">
      {value === index && (
        <div className='content'>
          {children}
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Announcements() {
  
  const [openPostPopup, setOpenPostPopup] = useState(false);
  const [postsLoading, setPostsLoading] = useState(false);
  const [value, setValue] = React.useState(0);
  const [posts, setPosts] = useState([]);
  let { classId } = useParams();
  console.log(classId);
  // const keys = {
  //   "All": "All",
  //   "18":"CSE-A 2018-2022",
  //   "733":"CSE-A 2018-2022",
  //   "734":"Electrical and Electronics Engineering",
  //   "735":"Electronics and Communication Engineering",
  //   "736":"Mechanical Engineering",
  //   "737":"Information Technology"
  // }
  const keys = {
    "General" : "General",
    "CSE" : "CSE",
    "ECE" : "ECE",
    "DT" : "DT",
    "HOSTEL" : "HOSTEL",
    "SAC" : "SAC"
  }

  const useStyles = makeStyles({
    tabs: {
  
      "& .MuiTabs-indicator": {
        backgroundColor: "#394867",
        height: 3,
      },
      "& .MuiTab-root":{
        fontWeight:'500',
        color:"gray"
      },
      "& .MuiTab-root.Mui-selected": {
        fontWeight:'600',
        color: '#14274E'
      },
      
    }
  })
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getPosts(){
    setPostsLoading(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const token = 'Bearer ' + localStorage.getItem('token');
    myHeaders.append("Authorization", token);
    
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      let status = 0;
      await fetch(api+"announcements/class/" + classId, requestOptions)
        .then(response => {status = response.status; return response.json()})
        .then(res => {
            console.log(res)
            if(status==200){
              setPosts(res);
            }
            else{
                alert("Could not fetch data. Please try again later.")
            }
            setPostsLoading(false);
        })
        .catch(error => console.log('error', error));
  }

 
  useEffect(() => {
    getPosts();
  }, [])

  return (
    <div>
    <div className="ann_general">
        <Sidebar/>        
        <div class="ann_general__right ann_general__right_ext" style={{marginTop: '65px'}}>
          <div style={{backgroundColor: 'white', width: '100%', textAlign: 'center'}}>
            <Typography sx={{ fontWeight: 600, fontSize: 24, m: 1.5 }}>All</Typography>
          </div>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderTop:1, borderColor: 'divider' }}>
              <AppBar elevation={1} position="static" sx={{bgcolor: "#F1F6F9"}}>
                <Tabs className={classes.tabs} variant="fullWidth" value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Posts" {...a11yProps(0)} />
                </Tabs>
              </AppBar>
            </Box>

            <TabPanel value={value} index={0}>
              {postsLoading ? <LinearProgress sx={{width:'100%', mt:'1px'}}/> : 
               localStorage.getItem('userType') === '1' ? <CreateCard heading="Create Post" plholder="What do you want to ask or share?" openPopup={openPostPopup} setOpenPopup={setOpenPostPopup} /> : <></>}
              {!postsLoading && Object.keys(posts).reverse().map((post)=>(
                  <Card key={post} author={posts[post].author} timestamp={posts[post].timestamp} title={posts[post].title} body={posts[post].content} link={posts[post].link} image={posts[post].imageUrl} forums={false} />
              ))} 
              {(posts.length<1 && !postsLoading) && <h5>No posts to display now</h5>}             
            </TabPanel>
          </Box>
        </div>
    </div>
    
    <PostPopup openPopup = {openPostPopup} setOpenPopup = {setOpenPostPopup}/> 

    </div>
  )
}
