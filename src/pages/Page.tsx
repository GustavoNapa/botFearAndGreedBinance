import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';

import { moonOutline, sunnyOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Inicio from './Inicio/Inicio';
import './Page.css';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  
  const [iconTheme, setIconTheme] = useState(moonOutline);

  function RoutesContentPages(){
    if(name === "Inicio") return(<Inicio />);
    else return(<IonHeader><IonToolbar><IonTitle>Página em produção</IonTitle></IonToolbar></IonHeader>);
  }

  useEffect(() => {
    if(localStorage.getItem("theme") === "dark") {
      document.body.classList.toggle('dark', true);
      setIconTheme(sunnyOutline);

      // SELECIONAR TOGGLE AUTOMATICAMENTE NO DARK THEME
      var toggle:any = document.querySelector('#themeToggle');
      toggle.checked = true;

      return;
    }
    else{

    document.body.classList.toggle('dark', false);
    setIconTheme(moonOutline);
    }
  }, []);

  function changeTheme(){
    if(localStorage.getItem("theme") === "dark") {
      localStorage.setItem("theme", "light");
      document.body.classList.toggle('dark', false);
      setIconTheme(moonOutline);

      return;
    }
    localStorage.setItem("theme", "dark");
    document.body.classList.toggle('dark', true);
    setIconTheme(sunnyOutline);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
          <IonItem slot="end">
            <IonIcon icon={iconTheme} />
            <IonToggle id="themeToggle" onClick={changeTheme} />
          </IonItem>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <RoutesContentPages />
      </IonContent>
    </IonPage>
  );
};

export default Page;
