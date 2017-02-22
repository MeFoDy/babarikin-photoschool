window.statSettings = {

	hasPlacesCount: 3, // количество свободных мест

	/*     Блок "Нам стоит доверять"     */
	trustYears: 15, // опыт съемки у преподавателя
	trustCompanies: 85, // компаний отправили сотрудников на обучение
	trustPercent: 100, // процентов результат
	trustCount: 2868, // прошли обучение

	oldPrice: 289, // старая цена
	newPrice: 159, // новая цена
	finalDate: '8 марта' // дата конца скидки

};
window.statSettings.discount = ((window.statSettings.oldPrice - window.statSettings.newPrice) * 100 / window.statSettings.oldPrice).toFixed(0);
