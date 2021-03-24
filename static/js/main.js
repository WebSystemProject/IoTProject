const protocol = document.location.protocol.startsWith("https")
  ? "wss://"
  : "ws://"; //Adding the Web Socket Support for real time chart update
const webSocket = new WebSocket(protocol + location.host);

webSocket.onopen = function(event) {
    console.log("Connection to web socket is successful !");
  };

webSocket.onmessage = async function onMessage(message) {
  try {
    if (message.data instanceof Blob){
        const blobToText = await message.data.text();
        const messageData = JSON.parse(blobToText);
        let xValue = messageData.DateTime.split('T');
        let dateVar = xValue[0].split('-');
        let timeVar = xValue[1].split(':');
        let xValueDate = new Date(dateVar[0],dateVar[1]-1,dateVar[2],
                              timeVar[0],timeVar[1],timeVar[2]);
        console.log(xValueDate);
        myChart.config.data.datasets[0].data.push({
          x: xValueDate,
          y: messageData.Temperature,
        });
        myChartHumidity.config.data.datasets[0].data.push({
          x: xValueDate,
          y: messageData.Humidity,
        });
        myChartPressure.config.data.datasets[0].data.push({
          x: xValueDate,
          y: messageData.Pressure,
        });
        myChartAltitude.config.data.datasets[0].data.push({
          x: xValueDate,
          y: messageData.Altitude,
        });
        myChart.update();
        myChartHumidity.update();
        myChartPressure.update();
        myChartAltitude.update();
        console.log(messageData);
    } else {
        console.log(message);
    }
  } catch (err) {
    console.error(err);
  }
};

webSocket.onerror = function (event) {
  console.error("WebSocket error observed:", event);
};


var chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
};

window.onload = function () {
  ctx = document.getElementById("myChartTemp").getContext("2d");
  window.myChart = new Chart(ctx, config);
  ctxHumidity = document.getElementById("myChartHumidity").getContext("2d");
  window.myChartHumidity = new Chart(ctxHumidity, configHumidity);
  ctxPressure = document.getElementById("myChartPressure").getContext("2d");
  window.myChartPressure = new Chart(ctxPressure, configPressure);
  ctxAltitude = document.getElementById("myChartAltitude").getContext("2d");
  window.myChartAltitude = new Chart(ctxAltitude, configAltitude);
};

var color = Chart.helpers.color;
var config = {
  type: "line",
  data: {
    datasets: [
      {
        label: "Tempetature",
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false,
        lineTension: 0,
        borderDash: [8, 4],
        data: [],
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Temperature Data",
    },
    scales: {
      xAxes: [
        {
          type: "realtime",
          realtime: {
            duration: 60000,
            refresh: 10000,
            delay: 10000
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Temperature(F)",
          },
        },
      ],
    },
    tooltips: {
      mode: "nearest",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: false,
    },
  },
};
var configHumidity = {
  type: "line",
  data: {
    datasets: [
      {
        label: "Humidity",
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        fill: false,
        lineTension: 0,
        borderDash: [8, 4],
        data: [],
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Humidity Data",
    },
    scales: {
      xAxes: [
        {
          type: "realtime",
          realtime: {
            duration: 60000,
            refresh: 10000,
            delay: 10000
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Humidity(g.m-3)",
          },
        },
      ],
    },
    tooltips: {
      mode: "nearest",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: false,
    },
  },
};
var configPressure = {
  type: "line",
  data: {
    datasets: [
      {
        label: "Pressure",
        backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
        borderColor: chartColors.blue,
        fill: false,
        lineTension: 0,
        borderDash: [8, 4],
        data: [],
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Pressure Data",
    },
    scales: {
      xAxes: [
        {
          type: "realtime",
          realtime: {
            duration: 60000,
            refresh: 10000,
            delay: 10000
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Pressure (Hpa)",
          },
        },
      ],
    },
    tooltips: {
      mode: "nearest",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: false,
    },
  },
};
var configAltitude = {
  type: "line",
  data: {
    datasets: [
      {
        label: "Altitude",
        backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
        borderColor: chartColors.purple,
        fill: false,
        lineTension: 0,
        borderDash: [8, 4],
        data: [],
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Altitude Data",
    },
    scales: {
      xAxes: [
        {
          type: "realtime",
          realtime: {
            duration: 60000,
            refresh: 10000,
            delay: 10000
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Altitude (meter)",
          },
        },
      ],
    },
    tooltips: {
      mode: "nearest",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: false,
    },
  },
};
