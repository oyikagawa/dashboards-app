export interface IChartData {
  date: string;
  temperature: number;
}
export interface IChartWoData {
  id: number;
  title: string;
}
export interface IChartState extends IChartWoData{
  checked: boolean;
  color: string;
}
export interface IChart extends IChartWoData{
  data: IChartData[];
}
