import {IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact} from '@ionic/react'
import {IonReactRouter} from '@ionic/react-router'
import {Route} from 'react-router-dom'
import Menu from './components/Menu'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */
/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css'

/* Theme variables */
import './theme/variables.css'
import IndexPage from './pages/IndexPage'
import ViewPage, {ViewPageProps} from './pages/ViewPage'
import {MemoryRouter} from 'react-router'
import {HelmetProvider} from 'react-helmet-async'
import {LanguageProvider} from './lib/language'

setupIonicReact()

const isServer = typeof window === 'undefined'
const Router = isServer ? MemoryRouter : IonReactRouter

const App: React.FC<{
    initialUrl?: string
    initialData?: unknown
}> = ({initialUrl, initialData}) => (
    <HelmetProvider>
        <LanguageProvider>
            <IonApp>
                <Router {...(isServer ? {initialEntries: [initialUrl ?? '/']} : {})}>
                    <IonSplitPane contentId="main">
                        <Menu/>
                        <IonRouterOutlet id="main">
                            <Route path="/" exact={true}>
                                <IndexPage/>
                            </Route>

                            <Route path="/pokemon/:name" exact={true}>
                                <ViewPage staticData={initialData as ViewPageProps['staticData']}/>
                            </Route>

                            <Route
                                path="/type/:kind"
                                exact
                                render={({match}) => (
                                    <IndexPage kind={match.params.kind}/>
                                )}
                            />
                        </IonRouterOutlet>
                    </IonSplitPane>
                </Router>
            </IonApp>
        </LanguageProvider>
    </HelmetProvider>
)


export default App
