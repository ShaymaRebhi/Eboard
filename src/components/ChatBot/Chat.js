import React, { Component } from 'react'

export default class Chat extends Component {
 componentDidMount(){
    (function(d, m){
        var kommunicateSettings = 
            {"appId":"3a58f1c3a2352a47f8105a1b6ae004bf3","popupWidget":true,"automaticChatOpenOnNavigation":true};
        var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
        window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
 }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}
