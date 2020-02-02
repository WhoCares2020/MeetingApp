import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button, CssBaseline, Typography, Card } from "@material-ui/core";
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import { Line } from "react-chartjs-2";
import * as d3 from "d3";
import * as cloud from "d3-cloud";
import io from "socket.io-client";
import "./App.css";
import NavBar from "./NavBar";
import "./App.css";
import D3 from "./D3";

const theme = createMuiTheme({ palette: "dark" });

function App() {
  const classes = useStyles();
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  const onButtonClick = useCallback(() => {
    fetch("http://localhost:5000/startrecord", { method: "POST" });
  }, []);

  const sock = useRef(null);

  useEffect(() => {
    sock.current = io.connect("http://localhost:5000");

    console.log(sock);
    if (sock.current) {
      sock.current.on("connect", () => {
        console.log("connected");
      });
      sock.current.on("disconnect", () => {
        console.log("disconnected");
      });
      sock.current.on("recording", setRecording);
      sock.current.on("transcript", setTranscript);
    }

    return () => {
      if (sock.current) {
        sock.current.off("connect");
        sock.current.off("disconnect");
        sock.current.off("recording");
        sock.current.off("transcript");
      }
    };
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className={["App", classes.root].join(" ")}>
        <NavBar />
        <div className={classes.content}>
          <Button
            onClick={onButtonClick}
            disabled={recording}
            className={[
              classes.button,
              recording ? classes.buttonOn : classes.buttonOff
            ].join(" ")}
          >
            {recording ? "Recording..." : "Start Recording"}
          </Button>
          <Card className={classes.card}>
            <Typography variant="h6" style={{ textAlign: "left" }}>
              Transcript
            </Typography>
            {transcript === "" ? (
              <Typography
                style={{ textAlign: "left", color: "grey" }}
                variant="body1"
              >
                Say something!
              </Typography>
            ) : (
              <Typography style={{ textAlign: "left" }} variant="body1">
                {transcript}
              </Typography>
            )}
          </Card>
          <Line data={{ 1: 1, 2: 2 }} />

          {/* <WordCloud */}
          {/*   className={classes.plot} */}
          {/*   data={[{ text: "one", size: 10 }, { text: "two", size: 30 }]} */}
          {/* /> */}
        </div>
      </div>
    </MuiThemeProvider>
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%"
  },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: "1rem 4rem",
    width: "40rem"
  },
  card: {
    width: "100%",
    alignSelf: "stretch",
    margin: ".5rem 0",
    padding: ".5rem"
  },
  plot: {
    width: "50%",
    height: 400
  },
  button: {
    color: "white",
    alignSelf: "flex-end"
  },
  buttonOn: {
    backgroundColor: "#885555"
  },
  buttonOff: {
    backgroundColor: "#558855"
  }
}));

export default App;
