import React from "react";
import { Link } from "react-router-dom";

function Search() {
  return (
    <div id="results">
        <h2 id="title">Search results</h2>
        <div class='row-post' style={{marginBottom:'20px'}}>
            <div class='container'>
                <div class='card-post rounded-post' style={{border: '1px solid rgb(160, 155, 155)'}}>
                    <div class='row'>
                        <div class='col-lg-5' style={{marginLeft:'40px', marginTop:'30px'}}>
                            <div>
                                <h3>Title</h3>
                                <h6>Time</h6>
                                <p>Content.........</p>
                                <Link  to="/">Readmore</Link>
                            </div>
                        </div>
                        <div class='col-lg-5 offset-lg-define'>
                            <center><img src='https://www.besttimetovisit.co.za/uploads/2019/01/beste-reistijd-danang-vietnam-640x360.jpg' style={{marginTop:'30px', marginBottom:'30px',  width:'100%', height:'100%'}} /></center>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
export default Search;