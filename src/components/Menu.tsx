import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, glassesOutline, hardwareChipOutline, heartOutline, heartSharp, information, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, settingsOutline, statsChartOutline, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Inicio',
    url: '/page/Inicio',
    iosIcon: glassesOutline,
    mdIcon: glassesOutline
  },
  {
    title: 'Informações',
    url: '/page/Informações',
    iosIcon: information,
    mdIcon: information
  },
  {
    title: 'Analizar',
    url: '/page/Analizar',
    iosIcon: statsChartOutline,
    mdIcon: statsChartOutline
  },
  {
    title: 'Parametros',
    url: '/page/Parametros',
    iosIcon: hardwareChipOutline,
    mdIcon: hardwareChipOutline
  },
  {
    title: 'Configurações',
    url: '/page/Configurações',
    iosIcon: settingsOutline,
    mdIcon: settingsOutline
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Bot Fear and Greed</IonListHeader>
          <IonNote>Public Key: </IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
