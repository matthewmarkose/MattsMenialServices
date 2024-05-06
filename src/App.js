import './App.css';
import {useEffect, useState} from "react";
import googleOneTap from "google-one-tap";
import Topbar from "./Topbar";

const App = ()=>{
    const [user, setUser] = useState(null)


    const handleResponse = (response)=>{
        const headers = { 'Authorization': `Bearer ${response.credential}` };

        const requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow"
        };

        fetch("https://menialservices.uw.r.appspot.com/user", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setUser(result)
            })
            .catch((error) => console.error(error));


    }
    const options = {
        client_id: "245850059914-ef42lm77v14ic0d7ea8gefkatkhh8ikk.apps.googleusercontent.com", // required
        auto_select: true, // optional
        cancel_on_tap_outside: true, // optional
        context: "signin", // optional
        itp_support: true,
        callback: handleResponse
    };

    useEffect(() => {
        googleOneTap(options, (response) => {
            // Send response to server
            console.log(response.credential);
        });
    });

  return(


      <div>
          {user && <Topbar firstName={user.firstname} lastName={user.lastname} imageUrl={user.url}   />}
          <h1>Hello</h1>
          <p>Welcome to matts menial services</p>
      </div>
  )
}

export default App;
