import Row from "./Row";
import { ThreeDots } from 'react-loader-spinner'

const Table = ({ items, getHistoricalData, historical, currency, title, loading }) => {
	return (
		<div className="column">
			{items && (<h4>{title}</h4>)}
			{loading ? (
				<div className="loader">
					<ThreeDots
						height="80"
						width="80"
						radius="9"
						color="#4fa94d"
						ariaLabel="three-dots-loading"
						wrapperClassName=""
						visible={true}
					/>
				</div>
			) : (
				<table className={`table ${!historical ? 'clickable' : ''}`}>
					<tbody>
						{items && Object.keys(items).map((key) => (
							<Row
								key={key}
								currency={key}
								value={historical ? (1 / items[key][currency]) : (1 / items[key])}
								getHistoricalData={getHistoricalData}
							/>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}

export default Table