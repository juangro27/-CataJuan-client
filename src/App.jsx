import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Chat from './components/Chat/Chat'
import Footer from './components/Footer/Footer'
import Navigation from './components/Navigation/Navigation'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <div className="App">
      <Navigation />
      <AppRoutes />
      <Chat />
      <Footer />
    </div>
  )
}

export default App
