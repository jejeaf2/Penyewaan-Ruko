export default function SearchBarCheckout(props) {
	return (
		<form onSubmit={props.handleSubmitSearch}>
			<div className="row justify-content-center align-items-center">
				<div className="col-auto">Search by:</div>
				<div className="col-auto">
					<select
						className="form-select"
						name="category"
						value={props.search.category}
						onChange={props.handleChangeSearch}
						style={props.style.input}
					>
						<option value="roomNo">Room No</option>
						<option value="customerName">Customer Name</option>
						<option value="customerId">Customer ID</option>
					</select>
				</div>
				<div className="col-6">
					<input
						className="form-control"
						type="text"
						id="query"
						name="query"
						value={props.search.query}
						onChange={props.handleChangeSearch}
						placeholder={`Search check out data`}
						style={props.style.input}
					/>
				</div>
				<div className="col-auto">
					<button
						type="submit"
						className="btn btn-outline-info"
						style={props.style.button}
					>
						Search
					</button>
				</div>
			</div>
		</form>
	);
}
