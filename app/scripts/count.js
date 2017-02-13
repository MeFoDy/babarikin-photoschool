window.statSettings = {
	oldPrice: 48, // старая цена курсов онлайн
	newPrice: 29, // новая цена курсов онлайн
	lessonsCount: 15,	// количество уроков

	hoursCount: 40, // часов включено в курс

	oldPriceLightroom: 170, // старая цена двух курсов в одном с Lightroom
	newPriceLightroom: 120, // новая цена двух курсов в одном с Lightroom
	lessonsCountLightroom: 12, // количество занятий онлайн курса
	courseHoursLightroom: 7 // N‑часовой курс
};
window.statSettings.discount = ((window.statSettings.oldPrice - window.statSettings.newPrice) * 100 / window.statSettings.oldPrice).toFixed(0);
window.statSettings.economyLightroom = (window.statSettings.oldPriceLightroom - window.statSettings.newPriceLightroom).toFixed(0);
