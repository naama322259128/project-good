import { connect } from 'react';
import React, { Component } from 'react'
import { Input, Menu, Segment } from 'semantic-ui-react'
const SignIn = (props) => {
    let fullName = "";
    let password = "";
    return (<>

        <div className="ui placeholder segment" >
            <img src='../../img/profile.png' />
            <div class="ui divided selection list">
                <a class="item">

                    Kumquats
  </a>
                <a class="item">
                    <div class="ui purple horizontal label">Candy</div>
                    Ice Cream
  </a>
                <a class="item">
                    <div class="ui red horizontal label">Fruit</div>
                    Orange
  </a>
                <a class="item">
                    <div class="ui horizontal label">Dog</div>
                    Poodle
  </a>
            </div>
            <div className="ui two column very relaxed stackable grid">
                <div className="column">

                    <div className="ui form">
                        <div className="field">
                            <label>Username</label>
                            <div className="ui left icon input">
                                <input type="text" placeholder="Username" onChange={(e) => { fullName = e.target.value }} required="true" />
                                <i className="user icon"></i>
                            </div>
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <div className="ui left icon input">
                                <input type="password" onChange={(e) => { password = e.target.value }} required="true" />
                                <i className="lock icon"></i>
                            </div>
                        </div>
                        <div className="ui blue submit button">Login</div>
                    </div>
                </div>

            </div>

        </div>
    </>
    );
}




export default SignIn;
