import { useContext } from "react";
import './Workspace.css' 
import { assets } from "../assets/assets";
import { Context } from "../context/Context";
import ReactMarkdown from 'react-markdown';
import { auth } from '../firebase/firebasecon'


const Main = ({userName}) => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    newChat,
    error,
  } = useContext(Context);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSent();
    }
  };

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
    <div className={`main `}>
      <div className="nav">
        
        <p className="heading" >Gemini Clone</p>
        <div className="nav-actions">
            <img src={assets.logout} alt="Logout Icon" className="logout" onClick={handlelogout}/>
          <img src={assets.userrr} alt="user" className="user" />
        </div>
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="intro">
              <p>
                <span>Hello,{userName}.</span>
              </p>
              <p>Your AI Assistance!</p>
            </div>
            
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.userrr} alt="profile" />
              <p>{recentPrompt}</p>
            </div>
            
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loaders">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <ReactMarkdown>{resultData}</ReactMarkdown>
              )}
            </div>
            {error && <div className="error-message">{error}</div>}
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              onKeyDown={handleKeyDown}
            />
            <div>
              
              <img src={assets.mic_icon} alt="" />
              
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              
            </div>
          </div>
          <div className="bottom-actions">
            <button onClick={newChat} className="clear-btn">Clear Conversation</button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Main;