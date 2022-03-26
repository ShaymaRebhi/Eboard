import React, {useEffect, useState} from 'react'
import '../css/Admin.css'
import {Link} from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router"


function Forum() {

    const [forum,setForum] = useState(null);
    const params = useParams()
    const fetchForum = async () => {
        await axios.get(
            'http://localhost:3000/forum/get/'+params.id
        ).then(res => {setForum(res.data);console.log(forum)});
    };

    useEffect(() => {
        fetchForum()
    }, []);

    return (
        <div>
            <div className="bodyy" style={{padding: '2% 0% 2%'}}>
                <div className="container">
                    <div className="container-fluid mt-100">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card mb-4">
                                    <div className="card-header">
                                        <div className="media flex-wrap w-100 align-items-center"><img
                                            src="https://i.imgur.com/iNmBizf.jpg" className="d-block ui-w-40 rounded-circle"
                                            alt=""/>
                                            <div className="media-body ml-3"><a href="javascript:void(0)" data-abc="true">Tom
                                                Harry</a>
                                                <div className="text-muted small">13 days ago</div>
                                            </div>
                                            <div className="text-muted small ml-3">
                                                <div>Member since <strong>01/1/2019</strong></div>
                                                <div><strong>134</strong> posts</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <p> For me, getting my business website made was a lot of tech wizardry things.
                                            Thankfully i get an ad on Facebook ragarding commence website. I get connected
                                            with BBB team. They made my stunning website live in just 3 days. With the
                                            increase demand of online customers. I had to take my business online. BBB Team
                                            guided me at each step and enabled me to centralise my work and have control on
                                            all aspect of my online business. </p>

                                    </div>
                                    <div
                                        className="card-footer d-flex flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3">
                                        <div className="px-4 pt-3">
                                             <span className="text-muted d-inline-flex align-items-center align-middle ml-4">
                                                 <i className="fa fa-eye text-muted fsize-3"/>
                                                 <span className="align-middle">14532</span>
                                             </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="cardd">
                                    <div className="p-3">
                                        <h6 style={{color:'#000'}}>Comments</h6>
                                    </div>
                                    <div className="mt-2">
                                        <div className="d-flex flex-row p-3"><img src="https://i.imgur.com/zQZSWrt.jpg"
                                                                                  className="rounded-circle mr-3" style={{width:'45px',height:'45px'}}/>
                                            <div className="w-100">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex flex-row align-items-center"><span
                                                        className="mr-2">Brian selter</span> </div>
                                                    <small>12h ago</small>
                                                </div>
                                                <p className="text-justify comment-text mb-0" style={{color:'#000'}}>Lorem ipsum dolor sit amet,
                                                    consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                                                    et dolore magna aliqua. Ut enim ad minim veniam</p>
                                                <div className="d-flex flex-row user-feed"><span className="wish"><i
                                                    className="fa fa-heart text-danger"></i>24</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row p-3"><img src="https://i.imgur.com/3J8lTLm.jpg"
                                                                                  className="rounded-circle mr-3"
                                                                                  style={{width:'45px',height:'45px'}}/>
                                            <div className="w-100">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex flex-row align-items-center"><span
                                                        className="mr-2">Seltos Majito</span></div>
                                                    <small>2h ago</small>
                                                </div>
                                                <p className="text-justify comment-text mb-0" style={{color:'#000'}}>Tellus in hac habitasse platea
                                                    dictumst vestibulum. Lectus nulla at volutpat diam ut venenatis tellus.
                                                    Aliquam etiam erat velit scelerisque in dictum non consectetur. Sagittis
                                                    nisl rhoncus mattis rhoncus urna neque viverra justo nec. Tellus cras
                                                    adipiscing enim eu turpis egestas pretium aenean pharetra. Aliquam
                                                    faucibus purus in massa.</p>
                                                <div className="d-flex flex-row user-feed"><span className="wish"><i
                                                    className="fa fa-heart text-dark"></i>14</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="mt-3 d-flex flex-row align-items-center p-3 form-color">
                                        <img
                                        src="https://i.imgur.com/zQZSWrt.jpg" width="50" className="d-block ui-w-40 rounded-circle" style={{width:'45px'}}/>
                                        <input type="text" className="form-control" placeholder="Enter your comment..."/>
                                        <button className="btn btn-dark">Reply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Forum
