import React,{ useState, useEffect } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Typography from '@mui/material/Typography';
import Card from "../Card/Card";
import ReplyCard from "../Card/ReplyCard";
import {useParams} from 'react-router-dom';
import './General.css';
import { Card as MuiCard } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import {api} from "../../api";
import getTimestamp from "../../Timestamp/timestamp";

function PostPage() {
    const [result, setResult] = useState([]);
    const [reply, setReply] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    let { branchId } = useParams();
    let { postId } = useParams();

    // console.log(postId)

    const handleReplyChange = (event) => {
        setReply(event.target.value);
    };
    const style = {
        width: {xs:'95%', sm:'67%'},
        mb:0.1,
        pl:5,
        pr:5
      }
    const keys = {
        "100": "General Discussions",
        "732":"Civil Engineering",
        "733":"Computer Science and Engineering",
        "734":"Electrical and Electronics Engineering",
        "735":"Electronics and Communication Engineering",
        "736":"Mechanical Engineering",
        "737":"Information Technology"
    }

    async function getResults(){
        setLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const token = 'Bearer ' + localStorage.getItem('token');
        myHeaders.append("Authorization", token);

        // var raw = JSON.stringify({"questionId":postId});
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        let status = 0;
        await fetch(api+"discussion-forum/question/"+postId, requestOptions)
        .then(response => {
            status = response.status; 
            return response.json()
        })
        .then(res => {
            console.log(res)
            if(status==200){
                setResult(res);
            }
            else{
                alert("Could not fetch data! Please try again later")
            }
            setLoading(false);
        })
        .catch(error => console.log('error', error));
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        setSubmitting(true);
        setSubmitDisabled(true);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const token = 'Bearer ' + localStorage.getItem('token');
        myHeaders.append("Authorization", token);

        var raw = JSON.stringify({"author":"Author", "qid": postId, "timestamp":getTimestamp(), "reply":reply});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        console.log(raw)
        fetch(api+"discussion-forum/reply/post", requestOptions)
        .then(response => response.json())
        .then(result =>{
            console.log(result);
            setReply('');
            setSubmitting(false);
            setSubmitDisabled(false);
            alert("Your reply has been successfully posted!")
            window.location.reload()
        })
        .catch(error => console.log('error', error));
    }

    useEffect(() => {
        getResults();
    }, [])

    return (
        <div>
            <div className='general'>
                <Sidebar/>
                <div class="general__right" style={{marginTop: '65px'}}>
                    <div style={{backgroundColor: 'white', width: '100%', textAlign: 'center', position:'sticky'}}>
                        <Typography sx={{ fontWeight: 600, fontSize: 24, m: 1.5 }}>{keys[branchId]+" - Replies"}</Typography>
                        {loading && <LinearProgress /> }
                    </div>
                    {(!loading && (Object.keys(result).length>0)) &&
                        <div className="general__right general__right_ext">
                            <Card author={result["author"]} timestamp={result["timestamp"]} title={result["title"]} body={result["body"]} mb="0" square={true}/>
                            <MuiCard 
                            sx={style} 
                            square={true}>
                                <CardHeader
                                    avatar = {<CreateIcon/>}
                                    title= {"Post Reply"}
                                    sx = {{mb: 1.5, pt:1.5, pb:0}}
                                />
                                <CardContent sx = {{m: 0, cursor:"pointer"}}>
                                {submitting?<Box sx={{ width: '100%' }}>
                                    <LinearProgress />
                                </Box>:<span></span>}
                                    <TextField size="small" fullWidth placeholder={"What are your thoughts?"} id="fullWidth" multiline={true} rows="3" value={reply} onChange={handleReplyChange}/>
                                    <Grid container justifyContent="flex-end"><Button sx={{mt:0.5}} size="small" variant="outlined" onClick={handleSubmit} disabled={submitDisabled}>Submit</Button></Grid>
                                </CardContent>      
                            </MuiCard>
                            {result.replies && Object.keys(result.replies).reverse().map((p) => (
                                    <ReplyCard key={result.replies[p].reply_id} author={result.replies[p].reply_author} timestamp={result.replies[p].reply_timestamp} reply={result.replies[p].reply_text}/>
                                // console.log(result.replies[p])
                            ))} 
                            {!result.replies && <h5>No replies yet</h5>}
                        </div>}
                    
                </div>
            </div>
        </div>
    )
}

export default PostPage