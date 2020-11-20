// import React, { Component } from 'react';
// import { VERIFY_USER } from '../Events'

// export default class SourceForm extends Component {
// 	constructor(props) {
// 	  super(props);
	
// 	  this.state = {
// 	  	source:"",
// 	  	error:""
// 	  };
// 	}

// 	handleSubmit = (e)=>{
// 		e.preventDefault()
// 		const { socket } = this.props
// 		const { source } = this.state
		
// 	}

// 	handleChange = (e)=>{
// 		this.setState({source:e.target.value})
// 	}

// 	setError = (error)=>{
// 		this.setState({error})
// 	}

// 	render() {	
// 		const { source, error } = this.state
// 		return (
// 			<div className="source">
// 				<form onSubmit={this.handleSubmit} className="source-form" >

// 					<label htmlFor="source-text">
// 						<h2>Set stream source</h2>
// 					</label>
// 					<input
// 						ref={(input)=>{ this.textInput = input }} 
// 						type="text"
// 						id="source-text"
// 						value={source-text}
// 						onChange={this.handleChange}
// 						placeholder={'http://public.ip.of.node:8935/stream/manID.m3u8'}
// 						/>
// 						<div className="error">{error ? error:null}</div>

// 				</form>
// 			</div>
// 		);
// 	}
// }

import React, {Fragment, useState} from 'react'
import {AnonymousCredential} from "mongodb-stitch-browser-sdk"

function SourceForm(props) {
    const {mongoConnection: {client, mongodb}} = props;
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    
   // const [errors, setErrors] = useState({});

    const submitURL = (e) =>{
        e.preventDefault();
//check input values

        client.auth.loginWithCredential(new AnonymousCredential()).then(
            ()=>{
                const db = mongodb.db("streamers");
                db.collection("streamerslist").insertOne({name, url});
                setName("");
                setUrl("");
            }
        ).catch(console.error);
    }

    return (
        <Fragment>
            <div class="ui fluid input">
                <input type="text" name="first-name" placeholder="Name" onChange={(e)=>{setName(e.target.value)}} value={name}/>
            </div>
            <div class="ui fluid input">
                <input type="text" name="last-name" placeholder="URL" onChange={(e)=>{setUrl(e.target.value)}} value={url}/>
            </div>
                <button className="ui fluid button" type="submit" onClick={submitURL} >Submit</button>
        </Fragment>
    )
}

export default SourceForm;
