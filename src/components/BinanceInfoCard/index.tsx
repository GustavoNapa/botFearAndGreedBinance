import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonFooter, IonIcon, IonItem, IonLabel, IonList, IonRouterLink, IonRow, IonText} from '@ionic/react';
import { pushOutline, shareOutline, swapHorizontalOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { exchangeInfo } from '../../services/binance';

interface binanceInfo{
  accountType:string,
  canWithdraw:Boolean,
  canDeposit:Boolean,
  canTrade:Boolean,
  makerCommission:Number,
  sellerCommission:Number,
  takerCommission:Number,
  serverTime:number,
  rateLimits: [
    {
      interval:string,
      intervalNum:number,
      limit:number,
      rateLimitType:string
    }
  ]
}

interface binanceFilter{
  filters: any,
  quoteAsset: string
}

function BinanceInfoCard(){
  const [binanceInfo, setbinanceInfo] = useState<binanceInfo>({
    accountType: '', 
    canWithdraw: false, 
    canDeposit: false,
    canTrade: false,
    makerCommission: 0,
    sellerCommission: 0,
    takerCommission: 0,
    serverTime: 0,
    rateLimits: [{
      interval:"",
      intervalNum:0,
      limit:0,
      rateLimitType:""
    }]
  });

  const [binanceFilters, setbinanceFilters] = useState<binanceFilter>({filters: [{'':''},{'':''},{'':''},{'':''},{'':''},{'':''},{'':''},{'':''}], quoteAsset: ''});

  async function binanceInfoAPI(){
    const infos = await exchangeInfo();
    const infosFilter = await exchangeInfo("BNBUSDT");

    console.log(infos);
    console.log(infosFilter[0]);

    setbinanceInfo(infos);
    setbinanceFilters(infosFilter[0]);
  }

  useEffect(() => {binanceInfoAPI();},[]);

  return (
    <IonCard>
      <IonCardHeader>
        <IonRow>
          <IonCol>
            <IonCardTitle>Binance</IonCardTitle>
          </IonCol>
        </IonRow>
      </IonCardHeader>
      <IonCardContent>
        <IonRow>
          <IonCol>
            <IonText>Limites de uso da API:</IonText>
            <IonList>
              {binanceInfo.rateLimits.map((value, index) => (
                <IonItem>
                  <IonLabel>{value.rateLimitType}</IonLabel>
                  <IonLabel>{value.intervalNum}/{value.limit}</IonLabel>
                  <IonLabel>{value.interval}</IonLabel>
                </IonItem>
              ))
              }
            </IonList>
          </IonCol>
        </IonRow>
        <br />
        <IonRow>
          <IonCol>
            <IonText>Simbolo sendo negociado: BNBBUSD</IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonText style={{alignItems: 'center'}}>Filtros para este simbolo:</IonText>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonText>QuoteAsset: {binanceFilters.quoteAsset}</IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <h2>Filtro de preço</h2>
            <p>{binanceFilters.filters[0].minPrice}/{binanceFilters.filters[0].maxPrice}</p>
            <p>{binanceFilters.filters[0].tickSize}</p>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <h2>Porcentagem do preço</h2>
            <p>{binanceFilters.filters[1].multiplierDown}/{binanceFilters.filters[1].multiplierUp}</p>
            <p>{binanceFilters.filters[1].avgPriceMins}</p>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <h2>Tamanho min/max para lote</h2>
            <p>{binanceFilters.filters[2].minQty}/{binanceFilters.filters[2].maxQty}</p>
            <p>{binanceFilters.filters[2].stepSize}</p>
          </IonCol>
        </IonRow>


        <IonRow>
          <IonCol>
            <h2>Quantidade minima negociada na unidade</h2>
            <p>{binanceFilters.filters[3].minNotional}</p>
            <p>{binanceFilters.filters[3].avgPriceMins}</p>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <h2>{binanceFilters.filters[4].filterType}</h2>
            <p>{binanceFilters.filters[4].limit}</p>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <h2>{binanceFilters.filters[5].filterType}</h2>
            <p>{binanceFilters.filters[5].minQty}/{binanceFilters.filters[5].maxQty}</p>
            <p>{binanceFilters.filters[5].stepSize}</p>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <h2>{binanceFilters.filters[6].filterType}</h2>
            <p>{binanceFilters.filters[6].maxNumOrders}</p>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <h2>{binanceFilters.filters[7].filterType}</h2>
            <p>{binanceFilters.filters[7].maxNumAlgoOrders}</p>
          </IonCol>
        </IonRow>
        <hr></hr>
      </IonCardContent>
      <IonFooter>
        
      </IonFooter>
    </IonCard>
  )
}

export default BinanceInfoCard;