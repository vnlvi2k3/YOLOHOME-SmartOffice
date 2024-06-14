export default function addData(chart: any, label: string, newData: string) {
  if (chart) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset: any) => {
      dataset.data.push(newData);
    });
    chart.update();
  }
}
