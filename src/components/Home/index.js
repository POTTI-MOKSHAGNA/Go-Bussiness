import Navbar from '../Navbar';
import Footer from '../Footer';
import Overview from './Overview';
import ServiceSummary from './ServiceSummary';
import MyReferral from './MyReferral';
import Referrals from './Referrals';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './index.css';

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
            setData(data);
        } else {
            setError(data.message);
        }
        setLoading(false);
    }
return(
    <div className="home-page">
        <Navbar />
        <main className="container home-main">
            {loading && <p className="muted">Loading dashboard…</p>}
            {error && (
              <div role="alert" className="error">
                {error.message}
                {error.status ? ` (status ${error.status})` : ""}
              </div>
            )}
            {!error && !loading && (
              <>
                <h1 className="home-title">Referral Dashboard</h1>
                <p className="home-subtitle">Track your referrals, earnings, and partner activity in one place.</p>
                <Overview />
                <ServiceSummary/>
                <MyReferral />
                <Referrals/>   
            </>)} 
        </main>
        <Footer />
    </div>
)
}
export default Home;