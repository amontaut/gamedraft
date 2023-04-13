import React from 'react';
import map1 from './map1.jpg';
import { MAP, PLAYER, Y_SIZE, X_SIZE, BALL_SIZE } from './Globals.js'

const inner = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "justify",
  backgroundImage: `url(${map1})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  width: "42%"
}

const outer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "justify",
  marginLeft: "5em",
  Text: "100px",
  padding: "10px"
}

const P1Score = {
  marginLeft: "332px",
  fontSize: "50px",
  color: "white"
}

const P2Score = {
  marginLeft: "54px",
  fontSize: "50px",
  color: "white"
}

const results = {
  marginLeft: "-300px",
  marginTop: "150px",
  fontSize: "75px",
  color: "white"
}

const style = {
  width: "150px",
  heigth: "250px",
  display: "grid",
  borderStyle: "hidden",
  gridTemplate: `repeat(${Y_SIZE}, 1fr) / repeat(${X_SIZE}, 1fr)`
}

const mapStyle = {
  height: "35px",
  width: "35px",
  justifyContent: "center",
}

const playerStyle = {
  height: "35px",
  width: "10px",
  borderStyle: "solid",
  justifyContent: "center",
  backgroundColor: "white",
  color: "white"
}

const ballStyle = (size) => ({
  height: 35 + size * 35,
  width: 35 + size * 35,
  display: "block",
  backgroundColor: "white",
  justifyContent: "center",
  borderRadius: "100%",
  color: "white",
  marginLeft: (-size - 0.5) * (35 / 2),
  marginTop: -size * (35 / 2),
});

const getStyle = (val, size) => {
  if (val === MAP) {
    return {};
  } if (val === PLAYER) {
    return playerStyle;
  } else {
    return ballStyle(size);
  }
}

export {
  inner,
  outer,
  P1Score,
  P2Score,
  style,
  results
}

const Box = (props) => <div style={mapStyle}>
  <div style={getStyle(props.name, props.size)} />
</div>

export default Box;