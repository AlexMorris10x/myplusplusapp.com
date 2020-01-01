import React from "react";
// import ShowcaseButton from "../showcase-components/showcase-button";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  LabelSeries
} from "react-vis";

const greenData = [
  { x: 12, y: 10 },
  { x: 17, y: 5 },
  { x: 20, y: 15 }
];

// const blueData = [
//   { x: 12, y: 12 },
//   { x: 17, y: 2 },
//   { x: 20, y: 11 }
// ];

// const labelData = greenData.map((d, idx) => ({
//   x: d.x,
//   y: Math.max(greenData[idx].y, blueData[idx].y)
// }));

export default class Line extends React.Component {
  state = {
    useCanvas: false
  };

  render() {
    const { useCanvas } = this.state;
    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
    return (
      <div>
        <XYPlot xType="ordinal" width={300} height={300} xDistance={1000}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <BarSeries className="vertical-bar-series-example" data={greenData} />
          {/* <BarSeries data={blueData} /> */}
          {/* <LabelSeries data={labelData} getLabel={d => d.x} /> */}
        </XYPlot>
      </div>
    );
  }
}
