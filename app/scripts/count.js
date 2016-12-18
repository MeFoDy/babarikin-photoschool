window.statSettings = {

	hasPlacesCount: 3, // количество свободных мест

	/*     Блок "Нам стоит доверять"     */
	trustYears: 10, // опыт съемки у преподавателя
	trustCompanies: 50, // компаний отправили сотрудников на обучение
	trustPercent: 100, // процентов результат
	trustCount: 1579, // прошли обучение

	oldPrice: 215, // старая цена
	newPrice: 135, // новая цена
	finalDate: '19 декабря' // дата конца скидки

};
window.statSettings.discount = ((window.statSettings.oldPrice - window.statSettings.newPrice) * 100 / window.statSettings.oldPrice).toFixed(0);
