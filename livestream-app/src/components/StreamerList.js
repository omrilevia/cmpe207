// import React, { Component } from 'react';


// export default class SourceForm extends Component {
// 	constructor(props) {
// 	  super(props);
	
// 	  this.state = {
	  	
// 	  };
//     }
    
    

// 	render() {	
		
//         const MongoClient = require('mongodb').MongoClient;
//         const uri = "mongodb+srv://omri:QpOz01!aaabbb@livepeer-cluster.mxdkw.mongodb.net/streamers?retryWrites=true&w=majority";
//         const client = new MongoClient(uri, { useNewUrlParser: true });
//         client.connect(err => {
//         const collection = client.db("streamers").collection("streamerslist");
//             // perform actions on the collection object
//             client.close();
//         });

// 		return (
// 		""	
// 		);
// 	}

	
// }


import React, { useState } from 'react'
import {Stitch, AnonymousCredential, RemoteMongoClient} from "mongodb-stitch-browser-sdk"

function StreamerList(props) {
    const  {changeStream, mongoConnection: {client, mongodb}} = props;
    const [streams, setStreams] = useState([])
    setTimeout(() => {
        if(client){
        client.auth.loginWithCredential(new AnonymousCredential()).then(
            ()=>{
                const db = mongodb.db("streamers");
                db.collection("streamerslist").find().asArray().then( res => {
                    setStreams(res);
                });
            }
        ).catch(console.error);}
    }, 2000);
    return (
        <table className="ui celled table">
        <thead>
          <tr><th>Name</th>
          <th>URL</th>
        </tr></thead>
        <tbody>
            {streams.map(stream => {
            return (<tr>
                <td data-label="Name">{stream.name}</td>
                <td data-label="URL"><a onClick={(e) => {changeStream(stream.url)}}>{stream.url}</a></td>
            </tr>);
            })}
        </tbody>
      </table>
    )
}

export default StreamerList
