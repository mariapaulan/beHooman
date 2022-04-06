import './Home.sass'
import { SearchActions, ListSearchActionsResults } from '../components'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

export const Home = ({ goToCreateSchedule, goToUserProfile }) => {

    const navigate = useNavigate()

    const showSearchActions = ({ query, requiredTime, requiredBudget }) => { navigate(`search?${query !== null ? `query=${query}` : ''}&${requiredTime !== null ? `requiredTime=${requiredTime}` : ''}&${requiredBudget !== null ? `requiredBudget=${requiredBudget}` : ''}`) }
    const showHome = () => navigate('/')

    return <div className='home'>
        <SearchActions onSearchActions={showSearchActions} onReset={showHome} />
        
        <Routes>
            <Route path='search' element={<ListSearchActionsResults goToCreateSchedule={goToCreateSchedule} goToUserProfile={goToUserProfile} />} />
        </Routes>
    </div>
}