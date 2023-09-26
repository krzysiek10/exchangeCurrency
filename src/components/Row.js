const Row = ({ currency, value, getHistoricalData }) => {
	return (
		<tr className="row" key={currency} onClick={getHistoricalData ? (() => getHistoricalData(currency)) : null}>
			<td className="currency">{currency}</td>
			<td>{value}</td>
		</tr>
	)
}

export default Row