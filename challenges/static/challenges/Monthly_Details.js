const MONTH_DETAILS_SELECTOR = '.details-page[data-month-int][data-current-year]';

const getMonthBreakdown = (year, month) => {
	const totalDays = new Date(year, month, 0).getDate();
	let weekendDays = 0;
	for (let day = 1; day <= totalDays; day += 1) {
		const weekday = new Date(year, month - 1, day).getDay();
		if (weekday === 0 || weekday === 6) {
			weekendDays += 1;
		}
	}
	return {
		weekendDays,
		weekdayDays: totalDays - weekendDays,
		totalDays,
	};
};

const getInsightMessages = (weekendDays) => {
	if (weekendDays >= 9) {
		return [
			'With extra weekends this month, plan deeper focus sessions or personal milestones.',
			'More free days available — ideal for long-term challenges and skill building.',
		];
	}
	if (weekendDays === 8) {
		return ['A balanced month — stay consistent with small daily progress.'];
	}
	if (weekendDays >= 6) {
		return ['Fewer weekends this month — focus on short, achievable daily goals.'];
	}
	return ['A compact month — lean into steady habits and celebrate small wins.'];
};

const renderCounts = (root, breakdown) => {
	root.querySelector('[data-role="weekday-count"]').textContent = breakdown.weekdayDays;
	root.querySelector('[data-role="weekend-count"]').textContent = breakdown.weekendDays;
	root.querySelector('[data-role="total-count"]').textContent = breakdown.totalDays;
};

const renderInsights = (root, weekendDays) => {
	const container = root.querySelector('[data-role="insight-messages"]');
	container.innerHTML = '';
	getInsightMessages(weekendDays).forEach((message) => {
		const paragraph = document.createElement('p');
		paragraph.textContent = message;
		container.appendChild(paragraph);
	});
};

const hydrateMonthlyDetails = () => {
	const details = document.querySelector(MONTH_DETAILS_SELECTOR);
	if (!details) {
		return;
	}
	const month = Number(details.dataset.monthInt);
	const year = Number(details.dataset.currentYear);
	if (!month || !year) {
		return;
	}
	const breakdown = getMonthBreakdown(year, month);
	renderCounts(details, breakdown);
	renderInsights(details, breakdown.weekendDays);
};

document.addEventListener('DOMContentLoaded', hydrateMonthlyDetails);
