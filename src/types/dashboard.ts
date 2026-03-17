export interface IMetricConfig {
  valueKey: string;
  prefix?: string;
  color?: string;
}

export interface IChartConfig {
  xAxis?: string;
  yAxis?: string;
  groupBy?: string;
  color?: string;
  colors?: string[];
  valueKey?: string;
  prefix?: string;
}

export interface IChartDataPoint {
  [key: string]: string | number;
}

export type ChartType = "metric" | "line" | "bar" | "pie" | "donut" | "area" | "scatter" | "table";

export interface IChart {
  id: string;
  title: string;
  type: ChartType;
  sql: string;
  config: IChartConfig | IMetricConfig;
  data: IChartDataPoint[];
  error?: string;
}

export interface IDashboard {
  title: string;
  charts: IChart[];
  insights: string;
}

export interface IDashboardData {
  sessionId: string;
  dashboard: IDashboard;
}

export interface IChatResponse {
  success: boolean;
  data: IDashboardData;
}
