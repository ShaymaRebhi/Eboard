import React, { useState, useEffect } from "react";
import "./Forum.css";
import "./Forums.css";
import Pagination from "./Pagination";

import {
  affichage,
  selectForum,
  supprimer,
  searchForum,
} from "../../redux/slices/ForumSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import CreateForum from "./CreateForum";

function Forums() {
  const dispatch = useDispatch();
  const forums = useSelector(selectForum);

  useEffect(() => {
    dispatch(affichage());
  }, [dispatch]);

  const Delete = (id) => {
    dispatch(supprimer(id));
  };

  const Search = (search) => {
    dispatch(searchForum(search));
  };
  const login = JSON.parse(localStorage.getItem("login"));

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = forums.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="bodyy" style={{ padding: "2% 0% 2%" }}>
        <div className="container">
          <div className="row">
            <div className="forum-img">
              <img src="images/fo4.png" alt="forumpicture" className="immmg" />
            </div>

            <div className="col-lg-12 mb-12" style={{ padding: "5% 0% 0%" }}>
              <div className="row text-left mb-5">
                <div className="col-lg-12 mb-3 mb-sm-0">
                  <input
                    type="text"
                    placeholder="Recherche"
                    className="form-control"
                    onChange={(e) => Search({ search: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div>{currentPosts.length === 0 ? "No data found!" : ""}</div>
            <br />

            {currentPosts.map((f, i) => (
              <>
                <div className="card row-hover pos-relative py-3 px-3 mb-3 border-warning border-top-0 border-right-0 border-bottom-0 rounded-0">
                  <div className="row align-items-center">
                    <div className="col-md-8 mb-3 mb-sm-0">
                      <h3>
                        <NavLink
                          to={`/forum/${f !== null ? f._id : ""}`}
                          className="text-primary"
                        >
                          {f !== null ? f.Title : ""}
                        </NavLink>
                      </h3>
                      <p style={{ color: "black" }}>
                        <strong>Description: </strong>
                        {f !== null ? f.Description : ""}
                      </p>
                      <p style={{ color: "black" }}>
                        <strong>Tags: </strong>
                        {f !== null ? f.Tags : ""}
                      </p>
                      <p className="text-sm">
                        <span
                          className="op-6"
                          style={{ color: "rgb(122 116 116)" }}
                        >
                          Posted
                        </span>{" "}
                        <a className="text-black" href="#">
                          {f !== null ? f.Date : ""}
                        </a>
                        <span
                          className="op-6"
                          style={{ color: "rgb(122 116 116)" }}
                        >
                          &nbsp; by{" "}
                        </span>{" "}
                        <a className="text-black" href="#">
                          aaa
                        </a>
                      </p>
                    </div>
                    <div className="col-md-4 op-7">
                      <div className="row text-center op-7">
                        {/*<div className="col px-1">
                              <i className="ion-connection-bars icon-1x"></i>
                              <span className="d-block text-sm">141 Votes</span>
                          </div>*/}
                        <div className="col px-1">
                          <i className="ion-ios-chatboxes-outline icon-1x" />
                          <span className="d-block text-sm">
                            {f !== null ? f.Comments.length : ""} Replys
                          </span>
                        </div>
                        {/*<div className="col px-1">
                              <i className="ion-ios-eye-outline icon-1x"></i>
                              <span className="d-block text-sm">290 Views</span>
                          </div>*/}
                        {login.User._id === f.User ? (
                          <div className="col px-1">
                            <a
                              href="javascript:void(0)"
                              onClick={() => Delete(f._id)}
                            >
                              <i className="fa fa-trash" />
                            </a>
                          </div>
                        ) : (
                          <div className="col px-1"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={forums.length}
              paginate={paginate}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Create a Forum
          </button>

          <div
            style={{ margin: "10% 0% 0% 0%" }}
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5
                    className="modal-title"
                    id="exampleModalLabel"
                    style={{ color: "#000" }}
                  >
                    Create a forum
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <CreateForum />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forums;
