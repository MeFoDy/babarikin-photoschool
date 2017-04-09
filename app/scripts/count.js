window.statSettings = {

	hasPlacesCount: 5, // количество свободных мест

	/*     Блок "Нам стоит доверять"     */
	trustYears: 15, // опыт съемки у преподавателя
	trustCompanies: 95, // компаний отправили сотрудников на обучение
	trustPercent: 100, // процентов результат
	trustCount: 3037, // прошли обучение

	oldPrice: 289, // старая цена
	newPrice: 159, // новая цена
	finalDate: '31 марта' // дата конца скидки

};
window.statSettings.discount = ((window.statSettings.oldPrice - window.statSettings.newPrice) * 100 / window.statSettings.oldPrice).toFixed(0);
