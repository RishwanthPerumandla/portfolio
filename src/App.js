import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import SinglePost from './components/SinglePost'
import Post from './components/Post'
import Project from './components/Project'
import Resume from './components/Resume'
import ReactGA from 'react-ga'
import Error from './components/Error'

function initializeAnalytics() {
  ReactGA.initialize('273298879')
  ReactGA.pageview('/')
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} path='/' exact />
        <Route component={About} path='/about' />
        <Route component={SinglePost} path='/post/:slug' />
        <Route component={Post} path='/post' />
        <Route component={Project} path='/project' />
        <Route component={Resume} path='/resume' />

        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
