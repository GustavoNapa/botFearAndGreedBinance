import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel, IonRouterLink, IonText, IonTitle } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import alternativeAPI from '../../services/alternativeFNG';

interface returnFearAndGreedIndex{
  value: string;
  time_until_update: string;
  timestamp: string;
  value_classification: string;
}

function FearAndGreedIndicator(){
  const initReturnFearAndGreedIndex = {
    value: "await",
    time_until_update: "await",
    timestamp: "await",
    value_classification: "await"
  }

  const [FGAPI, setFGAPI] = useState<returnFearAndGreedIndex>(initReturnFearAndGreedIndex);

  async function fearAndGreedSentimentAPI(){
    const returnSentiment = await alternativeAPI();

    console.log(returnSentiment);

    if(returnSentiment.metadata.error !== null) return;

    setFGAPI(await returnSentiment.data[0]);
  }

  useEffect(() => {fearAndGreedSentimentAPI();},[]);
  
  return (
    <IonCard>
      <IonCardContent>
        <IonCardTitle>Indice de medo e ganancia</IonCardTitle>
        <IonText>Valor atual: {FGAPI.value}</IonText><br />
        <IonText>Classificação de valor: {FGAPI.value_classification}</IonText><br />
        <IonText>
          <IonRouterLink href="https://alternative.me/crypto/fear-and-greed-index/">Fonte: Alternative.me</IonRouterLink>
        </IonText>
        <hr></hr>
        <img src="https://alternative.me/crypto/fear-and-greed-index.png" alt="Latest Crypto Fear & Greed Index" />
      </IonCardContent>
    </IonCard>
  )
}

export default FearAndGreedIndicator;