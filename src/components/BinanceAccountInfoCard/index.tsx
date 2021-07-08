import { IonCard, IonCardContent, IonCardTitle, IonText} from '@ionic/react';
import { useEffect, useState } from 'react';
import { exchangeInfo } from '../../services/binance';


function BinanceAccountInfoCard(){  

  const [binanceInfo, setBinanceInfo] = useState();

  async function binanceInfoAPI(){
    const infos = await exchangeInfo();

    console.log(infos);

    //setBinanceInfo(await account.data[0]);
  }

  useEffect(() => {binanceInfoAPI();},[]);
  
  return (
    <IonCard>
      <IonCardContent>
        <IonCardTitle>Informações da conta da Binance</IonCardTitle>
        <IonText>Valor atual: </IonText><br />
        <IonText>Classificação de valor: </IonText><br />
        <hr></hr>
      </IonCardContent>
    </IonCard>
  )
}

export default BinanceAccountInfoCard;