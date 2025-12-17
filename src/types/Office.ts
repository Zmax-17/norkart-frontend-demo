export interface Office {
  readonly id: number;
  readonly name: string;
  readonly type: string; // (Hovedkontor / Distriktskontor)
  readonly visitAddress: string;
  readonly postalAddress: string;
  readonly lat: number;
  readonly lon: number;
}
