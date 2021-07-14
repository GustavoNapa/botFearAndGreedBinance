import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonFooter, IonIcon, IonItem, IonLabel, IonList, IonRouterLink, IonRow, IonText} from '@ionic/react';
import { pushOutline, shareOutline, swapHorizontalOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { accountInformations } from '../../services/binance';

interface accountBinanceInfo{
  accountType:string,
  canWithdraw:Boolean,
  canDeposit:Boolean,
  canTrade:Boolean,
  makerCommission:Number,
  sellerCommission:Number,
  takerCommission:Number,
  balances: [
    {
      asset: string,
      free: string
    }
  ]
}

function BinanceAccountInfoCard(){
  const [accountInfo, setAccountInfo] = useState<accountBinanceInfo>({
    accountType: '', 
    canWithdraw: false, 
    canDeposit: false,
    canTrade: false,
    makerCommission: 0,
    sellerCommission: 0,
    takerCommission: 0,
    balances: [
      {
        asset: '',
        free: ''
      }
    ]
  });

  async function binanceInfoAPI(){
    const infos = await accountInformations();

    console.log(infos);

    setAccountInfo(infos.data);
  }

  useEffect(() => {binanceInfoAPI();},[]);

  return (
    <IonCard>
      <IonCardHeader>
        <IonRow>
          <IonCol>
            <IonCardTitle>Informações da conta da Binance</IonCardTitle>
          </IonCol>
        </IonRow>
      </IonCardHeader>
      <IonCardContent>
        <IonRow>
          <IonCol>
            <IonText>Tipo de conta: {accountInfo.accountType}</IonText>
          </IonCol>
        </IonRow>
        <br />
        <IonRow>
          <IonCol>
            <IonText style={{alignItems: 'center'}}>Permissões:</IonText>
          </IonCol>
          <IonCol class="ion-text-center">
            <IonText><IonIcon 
              icon={pushOutline} 
              color={accountInfo.canDeposit?'success':'danger'} 
              /></IonText><br />
            <IonLabel>Deposito</IonLabel>
          </IonCol>
          <IonCol class="ion-text-center">
            <IonText><IonIcon 
              icon={shareOutline} 
              color={accountInfo.canWithdraw?'success':'danger'} /></IonText><br />
              <IonLabel>Saque</IonLabel>
          </IonCol>
          <IonCol class="ion-text-center">
            <IonText><IonIcon 
              icon={swapHorizontalOutline} 
              color={accountInfo.canTrade?'success':'danger'} /></IonText><br />
              <IonLabel>Trade</IonLabel>
          </IonCol>
        </IonRow>
        <br />
        <IonRow>
          <IonCol>
            <IonText style={{alignItems: 'center'}}>Comissões:</IonText>
          </IonCol>
          <IonCol class="ion-text-center">
            <IonText>{accountInfo.makerCommission}</IonText><br />
            <IonLabel>Maker</IonLabel>
          </IonCol>
          <IonCol class="ion-text-center">
            <IonText>{accountInfo.sellerCommission}</IonText><br />
            <IonLabel>Saller</IonLabel>
          </IonCol>
          <IonCol class="ion-text-center">
            <IonText>{accountInfo.takerCommission}</IonText><br />
            <IonLabel>Taker</IonLabel>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonText>Balanços:</IonText>
            <IonList>
              {accountInfo.balances.map((value, index) => (
                <IonItem>
                  <IonLabel>{value.asset}</IonLabel>
                  <IonLabel>{parseFloat(value.free).toFixed(8)}</IonLabel>
                </IonItem>
              ))
              }
            </IonList>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol class="ion-text-end">
            <IonRouterLink href="/page/Informações">Leia mais</IonRouterLink>
          </IonCol>
        </IonRow>
        <hr></hr>
      </IonCardContent>
      <IonFooter>
        
      </IonFooter>
    </IonCard>
  )
}

export default BinanceAccountInfoCard;