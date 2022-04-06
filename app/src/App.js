import './App.sass'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Header, NavigationBar } from './components'
import { validators } from 'commons'
import {
  Register,
  Login,
  Home,
  Profile,
  CreateAction,
  UpdateAction,
  ListFavoriteActions,
  Schedules,
  CreatedActions,
  Community,
  Users,
  CreateSchedule
} from './pages'

const { validateToken } = validators


const App = () => {

  const isTokenValid = () => {
    try {
      return sessionStorage.token && validateToken(sessionStorage.token)
    }
    catch (error) {
      alert('La sesión ha caducado')
      delete sessionStorage.token
      return false
    }
  }

  const goBack = () => navigate(-1)

  const navigate = useNavigate()

  const showHome = () => navigate('/')
  const showLogin = () => navigate('/ingresar')
  const showRegister = () => navigate('/registrar')
  const showSchedules = () => navigate('/agenda')
  const showCreateSchedule = actionId => navigate(`agenda/agendar-accion/${actionId}`)
  const showActions = () => navigate('/acciones')
  const showFavorites = () => navigate('/acciones/favoritas')
  const showCommunity = () => navigate('/comunidad')
  const showUsers = () => navigate('/hoomans')
  const showUserProfile = userId => navigate(`/hoomans/${userId}`)
  const showProfile = () => navigate('/perfil')


  return <div>
    {isTokenValid() && <Header onLogo={showHome} />}
    <Routes>
      <Route path='/*' element={isTokenValid() ? <Home goToCreateSchedule={showCreateSchedule} goToUserProfile={showUserProfile} /> : <Navigate replace to='/ingresar' />} />
      <Route path='/ingresar' element={!isTokenValid() ? <Login goToHome={showHome} onRegister={showRegister} /> : <Navigate replace to='/' />} />
      <Route path='/registrar' element={!isTokenValid() ? <Register goToLogin={showLogin} onLogin={showLogin} /> : <Navigate replace to='/' />} />
      <Route path='/acciones/*' element={isTokenValid() ? <CreatedActions onSchedules={showSchedules} onFavorites={showFavorites} goBack={goBack} goToUserProfile={showUserProfile} goToCreateSchedule={showCreateSchedule} /> : <Navigate replace to='/' />} />
      <Route path='/comunidad' element={isTokenValid() ? <Community goToUserProfile={showUserProfile} onUsers={showUsers} /> : <Navigate replace to='/' />} />
      <Route path='/agenda/*' element={isTokenValid() ? <Schedules onCreatedActions={showActions} onFavorites={showFavorites} goBack={goBack} /> : <Navigate replace to='/' />} />
      <Route path='/perfil/*' element={isTokenValid() ? <Profile onLogout={showLogin} goBack={goBack} goToLogin={showLogin} /> : <Navigate replace to='/' />} />
      <Route path='/hoomans/*' element={isTokenValid() ? <Users goToCreateSchedule={showCreateSchedule} goToUsers={showUsers} goToCommunity={showCommunity} /> : <Navigate replace to='/' />} />
      <Route path="/404" element={<h1>Página no encontrada :(</h1>} />
      <Route path="*" element={<Navigate replace to='/404' />} />
    </Routes>
    {isTokenValid() && <NavigationBar onHome={showHome} onSchedules={showSchedules} onCommunity={showCommunity} onProfile={showProfile} />}




  </div>

}



export default App