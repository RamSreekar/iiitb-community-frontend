import React, {useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import CreateCard from "../Card/CreateCard";
import OppsCard from "../Card/OppsCard";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Popup from "./Popup";
import LinearProgress from '@mui/material/LinearProgress';
import {api} from "../../api";
import './Opportunities.css';

export default function Opportunities() {
    const [openPopup, setOpenPopup] = useState(false);  
    const [loading, setLoading] = useState(false);
    
    const [result, setResult] = useState([]);

    async function getResults(){
        setLoading(true);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const token = 'Bearer ' + localStorage.getItem('token');
        myHeaders.append("Authorization", token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders, 
            redirect: 'follow'
          };
          let status = 0
          fetch(api+"opportunities/all", requestOptions)
            .then(response => {
              status = response.status; 
              console.log(status); 
              return response.json();
            })
            .then(res => {
                console.log(res)
                if(status==200){
                    setResult(res);
                    console.log(result)
                }
                else{
                    alert("Could not fetch data. Please try again later.")
                }
                setLoading(false);
            })
            .catch(error => console.log('error', error));
    }


    useEffect(() => {
        getResults();
    }, [])

  return (
    <div className="opp_general">
        <div style={{backgroundColor: 'white', width: '100%', textAlign: 'center'}}>
            <Typography sx={{ fontWeight: 600, fontSize: 24, m: 1.5 }}>Opportunities</Typography>
            {loading?<LinearProgress/>:<span></span>}
        </div>
        <div className="opp_content">
            {!loading && 
            <div><Grid container direction={'row'}  alignItems="center">
                <Grid sx={{display:'flex', justifyContent:'center'}} item xs={12}>
                { localStorage.getItem('userType') === '1' && <CreateCard heading="Create Post" plholder="What do you want to ask or share?" width="100%" openPopup={openPopup} setOpenPopup={setOpenPopup}/> }
                </Grid>
                { Object.keys(result).reverse().map((post)=>
                (<Grid sx={{m:0, p:0, display:'flex', justifyContent:'center'}} item xs={12} sm={6}>
                    <OppsCard key={post} author={result[post].author} timestamp={result[post].timestamp} title={result[post].title} postId={result[post]._id} multiple={true}/>
                </Grid>))}
            </Grid>            
            <Popup openPopup = {openPopup} setOpenPopup = {setOpenPopup}/></div>}
        </div>
    </div>
  )
}
