import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import ChatForm from './components/ChatForm/ChatForm'
import Footer from './components/Footer/Footer'
import Navigation from './components/Navigation/Navigation'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <div className="App">
      <Navigation />
      <AppRoutes />
      <ChatForm />
      <Footer />
    </div>
  )
}

export default App
