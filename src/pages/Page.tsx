import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { moonOutline, sunnyOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { Route, useParams } from 'react-router';
import './Page.css';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  
  const [iconTheme, setIconTheme] = useState(moonOutline);

  useEffect(() => {
    if(localStorage.getItem("theme") === "dark") {
      document.body.classList.toggle('dark', true);
      setIconTheme(sunnyOutline);

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

        
            <IonTitle>Inicio</IonTitle>
            <IonTitle>Analizando</IonTitle>
      </IonContent>
    </IonPage>
  );
};

export default Page;
