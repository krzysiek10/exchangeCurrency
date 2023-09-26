import { useEffect, useState } from "react";
import Table from "./components/Table";

function App() {
	const API_KEY = 'fca_live_E1f9DTwmc3TM8FKpr4agbE2sg0D6V0Aojz2PhYkH';
	const currencies = 'AUD,BGN,BRL,CAD,CHF,CNY,CZK,DKK,EUR,GBP,HKD,HRK,HUF,IDR,ILS,INR,ISK,JPY,KRW,MXN,MYR,NOK,NZD,PHP,RON,RUB,SEK,SGD,THB,TRY,USD,ZAR';
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState([]);
	const [historicalData, setHistoricalData] = useState();
	const [currency, setCurrency] = useState();

	const fetchData = () => {
		fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&base_currency=PLN&currencies=${currencies}`)
			.then((res) => res.json())
			.then((data) => {
				setData(data.data);
			})
			.catch((err) => {
				setError(err.message);
				console.log(err.message);
			})
	}	

	useEffect(() => {
		fetchData()
	}, [])

	const formatDate = (y, m, d) => {
		let month = '' + (m + 1).toString();
		let day = '' + d.toString();
	
		if (month.length < 2) 
			month = '0' + month;
		if (day.length < 2) 
			day = '0' + day;
	
		return [y, month, day].join('-');
	}

	// Get historical data
	const getHistoricalData = async (currency) => {
		const now = new Date();
		const to = new Date(now.valueOf() - 60 * 60 * 24 * 1000 * 2);
		const date_to = formatDate(to.getFullYear(), to.getMonth(), to.getDate());
		const from = new Date(now.valueOf() - 60 * 60 * 24 * 1000 * (6 + now.getDay()));
		const date_from = formatDate(from.getFullYear(), from.getMonth(), from.getDate());

		fetch(`https://api.freecurrencyapi.com/v1/historical?apikey=${API_KEY}&base_currency=PLN&currencies=${currency}&date_from=${date_from}&date_to=${date_to}`)
			.then(setLoading(true))
			.then((res) => res.json())
			.then((data) => {
				setHistoricalData(data.data);
			})
			.catch((err) => {
				setError(err.message);
				console.log(err.message);
			})
			.finally(() => {
				setLoading(false)
			});

    	setCurrency(currency);
    	setHistoricalData(data.data);
	}

	return (
		<div className="App">
			{error && (
				<div>{`Error - ${error}`}</div>
			)}
			<div className="container">
				<Table 
					items={data} 
					getHistoricalData={getHistoricalData} 
					title='Kliknij w wiersz, aby wyświetlić kursy danej waluty od poniedziałku zeszłego tygodnia' 
				/>
				<Table 
					items={historicalData} 
					historical={true} 
					currency={currency} 
					title={`Kursy ${currency} od poniedziałku zeszłego tygodnia`}
					loading={loading} 
				/>
			</div>
		</div>
	);
}

export default App;
