import Navbar from '../../components/Navbar';
import Terminal from '../../components/Terminal';
import Profile from '../../components/Profile';
import Header from '../../components/Header';
import { useEffect } from 'react';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';



const ViewerQuery = gql`
query ViewerQuery {
  viewer {
    name
  }
}
`

const Home = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(ViewerQuery);
  const viewer = data?.viewer;
  const shouldRedirect = !(loading || error || viewer);

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/accounts/signin')
    }
  }, [shouldRedirect])

  if (loading) {
    return (<div className="container bg-info text-center border mt-4 pb-2"><Header title="Vulspa Profile" />Loading...</div>)
  }

  if (error) {
    return (<div className="container bg-info text-center border mt-4 pb-2">{error.message}</div>)
  }
  if (viewer) {
    return (<div>
      <Header title="Vulspa Profile" />
      <Navbar />
      <div className="row">
        <div className="col container bg-info border mt-4 pb-2 ml-4 mr-2">
          <Terminal username={viewer.name} />
        </div>
        <div className="col container bg-info border mt-4 pb-2 ml-2 mr-4">
          <Profile viewer={viewer} router={router} />
        </div>
      </div>
    </div >)
  }
  return (<></>) //While waiting for redirect since this period is so short any way there no point in render text.
}

export default Home;