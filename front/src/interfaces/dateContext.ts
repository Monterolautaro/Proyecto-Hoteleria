export interface IDateContext {
  diffDays: number | null;
  setDiffDays: React.Dispatch<React.SetStateAction<number | null>>;
  startDateContext: Date | null;
  setStartDateContext: React.Dispatch<React.SetStateAction<Date | null>>;
  endDateContext: Date | null;
  setEndDateContext: React.Dispatch<React.SetStateAction<Date | null>>;
}
