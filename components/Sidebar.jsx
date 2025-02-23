import './Sidebar.css' 
import { useContext, useState } from "react"; 
import { assets } from "../assets/assets"; 
import { auth } from '../firebase/firebasecon'
import { Context } from "../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false); 
  const [style, setStyle]=useState({
    width: '250px',
  });
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context); 

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);   
    await onSent(prompt); 
  };
  const handleextend=()=>{
    setExtended((prev) => !prev)
    setStyle((prevStyle) => ({
      width: prevStyle.width === '250px' ? '76px' : '250px'
     
    }))
  }
  async function handlelogout() {
      try {
          auth.signOut();
          window.location.href="/Signin"
          console.log("logged out");
          
      } catch (error) {
          console.log(error)
      }
  }
  return (
    <div className="sidebar" style={style}>
      <div className="top">
        <img
          
          onClick={handleextend}
          className="menu"
          src={assets.menu_icon}
          alt="Menu Icon"
        />
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extended ? null : <p>New Chat</p>}
          
        </div>
        {extended ? null : (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div
                key={index} 
                onClick={() => loadPrompt(item)} 
                className="recent-entry"
              >
                <img src={assets.message_icon} alt="Message Icon" />
                <p>{item.slice(0, 15)} ...</p>{" "}
               
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Question Icon" />
          {extended ? null : <p>Help</p>} 
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="History Icon" />
          {extended ?  null : <p>Activity</p>}{" "}
          
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extended ? null  : <p>Settings</p>}{" "}
          
        </div>

        <div className="bottom-item recent-entry" onClick={handlelogout}>
          <img src={assets.logout} alt="Logout Icon" />
          {extended ? null  : <p>Log out</p>}{" "}  
        </div>

      </div>
    </div>
  );
};

export default Sidebar; 
