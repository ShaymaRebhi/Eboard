import React,{useState,useEffect}  from 'react'
import './Forum.css'
import { selectForum} from "../../redux/slices/ForumSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";


function Forums() {
    const dispatch = useDispatch();
    const  forums = useSelector(selectForum );

    const [fs,setFs] = useState([])
    const fetchForums = async () => {
        const response = await axios.get(
            "http://localhost:3000/forum/all"
        ).then(res => {setFs(res.data);console.log(res.data)});
    };
    useEffect(() => {
        //dispatch(affichage)
    fetchForums()
    }, [dispatch]);
    return (
        <div>
            <div className="bodyy">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12 mb-12">
                            <div className="row text-left mb-5">
                                <div className="col-lg-6 mb-3 mb-sm-0">
                                    <input type="text" placeholder="Recherche" className="form-control"/>
                                </div>
                                <div className="col-lg-6 mb-3 mb-sm-0">
                                    <select className="form-control">
                                        <option>test</option>
                                        <option>test2</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {fs.map((f) => (
                            <div
                                className="card row-hover pos-relative py-3 px-3 mb-3 border-warning border-top-0 border-right-0 border-bottom-0 rounded-0">
                                <div className="row align-items-center">
                                    <div className="col-md-8 mb-3 mb-sm-0">
                                        <h5>
                                            <a href="#" className="text-primary">{f.Title}</a>
                                        </h5>
                                        <p className="text-sm"><span className="op-6" style={{color:'rgb(122 116 116)'}}>Posted</span> <a className="text-black"
                                                                                                                                          href="#">{f.Date}</a>
                                            <span className="op-6" style={{color:'rgb(122 116 116)'}} >&nbsp; by </span> <a className="text-black" href="#">aaa</a>
                                        </p>
                                        <div className="text-sm op-5"><a className="text-black mr-2" href="#">#C++</a> <a
                                            className="text-black mr-2" href="#">#AppStrap Theme</a> <a
                                            className="text-black mr-2" href="#">#Wordpress</a></div>
                                    </div>
                                    <div className="col-md-4 op-7">
                                        <div className="row text-center op-7">
                                            <div className="col px-1"><i className="ion-connection-bars icon-1x"></i> <span
                                                className="d-block text-sm">141 Votes</span></div>
                                            <div className="col px-1"><i className="ion-ios-chatboxes-outline icon-1x"></i>
                                                <span className="d-block text-sm">122 Replys</span></div>
                                            <div className="col px-1"><i className="ion-ios-eye-outline icon-1x"></i> <span
                                                className="d-block text-sm">290 Views</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))}


                    </div>
                </div>

            </div>
        </div>
    )
}

export default Forums
