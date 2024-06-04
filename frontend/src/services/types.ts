export type TPortfolio = {
  geographic_region: string;
  id: number;
  name: string;
  owner: string;
  properties: TProperty[];
};

export type TProperty = {
  id: number;
  address: string;
  estimated_value: number;
  construction_year: number;
  square_footage: number;
  portfolio: number;
};
