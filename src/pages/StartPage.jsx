import { TopFormLayout } from "../layouts/topFormLayout/TopFormLayout";
import PageTitle from "../ui/titles/pageTitle/PageTitle";
import СreditСalculationPlate from '../modules/creditСalculationPlate/СreditСalculationPlate'
import ContinuePlate from "../modules/continuePlate/ContinuePlate";
import MortgageСalculationForm from '../frames/mortgageСalculationForm/MortgageСalculationForm';

function StartPage() {
  return (
    <MortgageСalculationForm>
      <TopFormLayout>
        <PageTitle>Рассчитайте ипотеку быстро и просто</PageTitle>
        <СreditСalculationPlate/>
      </TopFormLayout>
      <ContinuePlate/>
    </MortgageСalculationForm>
  );
}

export default StartPage;
