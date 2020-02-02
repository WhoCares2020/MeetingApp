import React, { useState, useCallback } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Line } from "react-chartjs-2";
import * as d3 from "d3";
import * as cloud from "d3-cloud";
import io from "socket.io-client";
import "./App.css";
import NavBar from "./NavBar";
import "./App.css";
import D3 from "./D3";

// const socket = io();

function App() {
  const classes = useStyles();
  const [recording, setRecording] = useState(false);

  const onButtonClick = useCallback(() => {
    setRecording(r => !r);
    fetch("http://localhost:5000/startrecord", { method: "POST" });
  }, [setRecording]);

  return (
    <div className={["App", classes.root].join(" ")}>
      <NavBar />
      <div className={classes.content}>
        <Button
          onClick={onButtonClick}
          disabled={recording}
          className={recording ? classes.buttonOn : classes.buttonOff}
        >
          Hello
        </Button>

        {/* <Line data={{ 1: 1, 2: 2 }} /> */}

        {/* <WordCloud */}
        {/*   className={classes.plot} */}
        {/*   data={[{ text: "one", size: 10 }, { text: "two", size: 20 }]} */}
        {/* /> */}
      </div>
    </div>
  );
}

/**
 * data: {text: string, size: number}[]
 */
const WordCloud = ({ className, data }) => (
  <D3
    className={className}
    render={el => {
      const svg = d3.select(el);
      const layout = cloud()
        .size([el.clientWidth, el.clientHeight])
        .words(data)
        .padding(5)
        .rotate(0)
        .font("Impact")
        .fontSize(w => w.size)
        .on("end", draw);

      layout.start();

      function draw(data) {
        svg
          .append("g")
          .attr(
            "transform",
            "translate(" +
              layout.size()[0] / 2 +
              "," +
              layout.size()[1] / 2 +
              ")"
          )
          .selectAll("text")
          .data(data)
          .enter()
          .append("text")
          .style("font-size", d => d.size)
          .style("fill", "#69b3a2")
          .attr("text-anchor", "middle")
          .style("font-family", "Impact")
          .attr(
            "transform",
            d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"
          )
          .text(d => d.text);
      }
    }}
  />
);

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%"
  },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  plot: {
    width: "50%",
    height: 400
  },
  buttonOn: {
    color: "white",
    backgroundColor: "#885555"
  },
  buttonOff: {
    color: "white",
    backgroundColor: "#558855"
  }
}));

export default App;
