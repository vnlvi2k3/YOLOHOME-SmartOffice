export default function removeData(chart: any) {
  if (chart) {
    chart.data.labels.shift();
    chart.data.datasets.forEach((dataset: any) => {
      dataset.data.shift();
    });
    chart.update();
  }
}
