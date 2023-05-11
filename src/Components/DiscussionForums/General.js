import React, {useState, useEffect} from 'react';
import Popup from '../DiscussionForums/Popup';
import Card from "../Card/Card";
import CreateCard from "../Card/CreateCard";
import Sidebar from './Sidebar/Sidebar';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import {useParams, Link} from 'react-router-dom';
import {api} from "../../api";
import './General.css';

function General() {
    const [openPopup, setOpenPopup] = useState(false);    
    const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  let { branchId } = useParams();
  const keys = {
    "100": "General Discussions",
    "732":"Civil Engineering",
    "733":"Computer Science and Engineering",
    "734":"Electrical and Electronics Engineering",
    "735":"Electronics and Communication Engineering",
    "736":"Mechanical Engineering",
    "737":"Information Technology"
  }
  const keys2 = {
    "General": "General",
    "CSE":"CSE",
    "ECE":"ECE",
    "DT":"DT"
  }
  

  async function getResults(){
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const token = 'Bearer ' + localStorage.getItem('token');
    myHeaders.append("Authorization", token);
  
    var raw = JSON.stringify({"branchId":keys2[branchId]});
    //var raw = JSON.stringify({"branchId": "CSE"});

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    // console.log(raw);
    let status = 0;
    await fetch(api+"discussion-forum/questions/"+keys2[branchId], requestOptions)
    .then(response => {
      status = response.status; 
      return response.json()
    })
    .then(res =>{
      console.log(posts);
      setLoading(false);
      if(status==200){
        setPosts(res)
      }
      else{
        alert("Could not fetch data. Please try again later.")
      }
    })
    .catch(error => console.log('error', error));
  }

  useEffect(() => {
    // setPosts(postsArr)
    getResults()
  }, [branchId])
  return (
            <div>
                <div className='general'>
                    <Sidebar/>
                    <div class="general__right general__right_ext" style={{marginTop: '65px'}}>
                        {/* <div className='general_right_cover'></div> */}
                        <div style={{backgroundColor: 'white', width: '100%', textAlign: 'center', position:'sticky'}}>
                            <Typography sx={{ fontWeight: 600, fontSize: 24, m: 1.5 }}>{keys[branchId]}</Typography>
                        </div>
                        {loading &&
                        <LinearProgress sx={{width:'100%'}}/>}
                        {!loading && <CreateCard heading="Create Post" plholder="What do you want to ask or share?" openPopup={openPopup} setOpenPopup={setOpenPopup} />}
                        {!loading && Object.keys(posts).reverse().map((p) => (           
                            <Card author={posts[p].author} timestamp={posts[p].timestamp} title={posts[p].title} body={posts[p].body} branchId={branchId} postId={posts[p]._id} forums={true}/>
                        ))}
                        {(posts.length<1 && !loading) && <h5>No posts to display now</h5>}
                    </div>
                    <Popup openPopup = {openPopup} setOpenPopup = {setOpenPopup}/>
                </div>
            </div> 
        );
}

export default General;
