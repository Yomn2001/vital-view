const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

const rotationValues = [
  { minDegree: 0, maxDegree: 30, label: "Jumping Jacks" },
  { minDegree: 31, maxDegree: 90, label: "Push Ups" },
  { minDegree: 91, maxDegree: 150, label: "Squats" },
  { minDegree: 151, maxDegree: 210, label: "Lunges" },
  { minDegree: 211, maxDegree: 270, label: "Sit-ups" },
  { minDegree: 271, maxDegree: 330, label: "Plank" },
  { minDegree: 331, maxDegree: 360, label: "Jumping Jacks" },
];

const data = [16, 16, 16, 16, 16, 16];
const pieColors = ["#EBD0FF", "#FFD0FC", "#EBD0FF", "#FFD0FC", "#EBD0FF", "#FFD0FC"];

let myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: ["Jumping Jacks", "Push Ups", "Squats", "Lunges", "Sit-ups", "Plank"],
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: { display: false },
      datalabels: {
        color: "#222222",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: 5,
        clip: true,
      },
    },
  },
});

// Function to determine the selected exercise based on the angle value
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Exercise: ${i.label}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};

let count = 0;
let resultValue = 101;

spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true; // Disable the spin button while spinning
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  
  // Generate a random degree for the wheel to spin to
  let randomDegree = Math.floor(Math.random() * 360);
  let rotationInterval = window.setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resultValue; // Increment rotation
    myChart.update(); // Update the chart

    // Reset rotation if it exceeds 360 degrees
    if (myChart.options.rotation >= 360) {
      count += 1; // Increment count
      resultValue -= 5; // Decrease rotation speed
      myChart.options.rotation = 0; // Reset rotation
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      // Check if the wheel has reached the desired degree
      valueGenerator(randomDegree); // Get the selected exercise
      clearInterval(rotationInterval); // Stop the spinning
      count = 0; // Reset count
      resultValue = 101; // Reset rotation speed
    }
  }, 10); // Set interval for spinning
});
S