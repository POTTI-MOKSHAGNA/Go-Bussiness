import NavBar from '../NavBar';
import Footer from '../Footer';
import Overview from '../Overview';
import ServiceSummary from '../ServiceSummary';
import MyReferral from '../MyReferral';
import Referrals from '../Referrals';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './index.css';
import {ThreeDots} from 'react-loader-spinner'

function Home(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        const jwtToken = Cookies.get('jwt_token');
        const url = "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals"
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            }
        }; 
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        if(response.ok) {
            setData(data?.data);
        } else {
            setError(data?.data);
        }
        setLoading(false);
    }
return(
    <div className="home-page">
        <NavBar />
        <main className="home-main">
            {loading && <div className="loader-container" data-testid="loader">
            <ThreeDots color="#ff0b37" height={50} width={50} />
          </div>}
            {error && (
              <div role="alert" className="error">
                <p>{error.message}</p>
                {error.success ? ` (status ${error.success})` : ""}
              </div>
            )}
            {!error && !loading && (
              <>
                <h1 className="home-title">Referral Dashboard</h1>
                <p className="home-subtitle">Track your referrals, earnings, and partner activity in one place.</p>
                <Overview metrics={data.metrics} />
                <ServiceSummary summary={data.serviceSummary} />
                <MyReferral referral={data.referral} />
                <Referrals referrals={data.referrals} />   
            </>)} 
        </main>
        <Footer />
    </div>
)
}
export default Home;