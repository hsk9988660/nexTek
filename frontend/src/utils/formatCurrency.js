export const formatCurrency = (amount, currency) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: currency === "USD" ? "USD" : "EUR",
		minimumFractionDigits: 2,
	});
	return formatter.format(amount);
};
