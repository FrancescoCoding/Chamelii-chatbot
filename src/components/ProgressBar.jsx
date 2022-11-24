import React from 'react'
  
const ProgressBar = ({bgcolor, progress, height}) => {
     
    const Parentdiv = {
        height: height,
        width: '35%',
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        margin: "10px auto"
      }
      
      const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "end"
      }
      
      const progresstext = {
        padding: 10,
        color: 'white',
        fontWeight: 900
      }
        
    return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
    )
}
  
export default ProgressBar;