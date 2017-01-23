window.statSettings = {

	hasPlacesCount: 3, // количество свободных мест

	/*     Блок "Нам стоит доверять"     */
	trustYears: 13, // опыт съемки у преподавателя
	trustCompanies: 79, // компаний отправили сотрудников на обучение
	trustPercent: 100, // процентов результат
	trustCount: 2813, // прошли обучение

	oldPrice: 46, // старая цена
	newPrice: 29, // новая цена
	finalDate: '30 января' // дата конца скидки

};
window.statSettings.discount = ((window.statSettings.oldPrice - window.statSettings.newPrice) * 100 / window.statSettings.oldPrice).toFixed(0);
