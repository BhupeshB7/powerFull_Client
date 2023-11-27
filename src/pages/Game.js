import React from "react";
import LOGO from "../assets/icon.png"
const Game = () => {
    const handleGame = () => {
        window.location.href = "/game/colorpridiction";
    }
    const handleGame2 = () => {
      window.location.href = "/game/spinWheel";
  }



  return (
    <div className="bg-spin" style={{height:'100vh'}}>
      <div className="gameLogo">
        <img src={LOGO} alt="logo" height='70px' width='100px'/>
      </div>
      <div className="game">
      <img src="https://img.freepik.com/free-vector/games-time-neon-text-with-gamepad_1262-15457.jpg?size=626&ext=jpg&ga=GA1.1.393936886.1688825666&semt=ais" height='100px' width='310px' alt="welcom" style={{borderRadius:'10px', marginTop:'-25px'}}/>
      </div>
      <div
        className="container pt-3"
        style={{height:'500px', width:'90%', borderRadius:'13px'}}
      >
        
                <div className="row">
        <h6 className="text-warning pt-3" style={{marginRight:'0px'}}>Latest Game</h6>
          <div
            className="col-10 col-sm-10 col-md-6 col-lg-6 box d-flex align-items-center flex-column" style={{width:'70%'}}
            onClick={handleGame}
          >
            <img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/artificial-game-3460208-2892839.png?f=avif&w=256" height='100px' width='100px'/>
            <h6 className="text-light">Color Prediction</h6>
          </div>
          <h6 className="text-warning pt-3">UpComing Game</h6>
          
          <div
            className="col-10 col-sm-10 col-md-6 col-lg-6 box d-flex align-items-center flex-column" style={{width:'70%'}}
            onClick={handleGame2}
          >
            <img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/big-six-wheel-2-1084832.png?f=avif&w=256" height='100px' width='100px'/>
            <h6 className="mt-2 text-light">Spin Wheel</h6>
          </div>
          
          {/* <div
            className="col-10 col-sm-10 col-md-6 col-lg-6 box d-flex align-items-center flex-column" style={{width:'70%'}}
            onClick={handleGame2}
          >
            <img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/big-six-wheel-2-1084832.png?f=avif&w=256" height='100px' width='100px'/>
            <h6 className="mt-2 text-light">Spin Wheel</h6>
          </div> */}
        </div>
        
      </div>
     
    </div>
  );
};

export default Game;
