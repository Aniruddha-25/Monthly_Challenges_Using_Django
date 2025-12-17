import calendar
from datetime import date
from django.shortcuts import render
from django.http import HttpResponse, Http404
from django.template.loader import render_to_string

# Create your views here.

month_list = {
    "january": "January Challenge",
    "february": "February Challenge",
    "march": "March Challenge",
    "april": "April Challenge",
    "may": "May Challenge",
    "june": "June Challenge",
    "july": "July Challenge",
    "august": "August Challenge",
    "september": "September Challenge",
    "october": "October Challenge",
    "november": "November Challenge",
    "december": "December Challenge",
}
months_int = {
    "january": 1,
    "february": 2,
    "march": 3,
    "april": 4,
    "may": 5,
    "june": 6,
    "july": 7,
    "august": 8,
    "september": 9,
    "october": 10,
    "november": 11,
    "december": 12,
}


def _month_week_breakdown(year: int, month_number: int):
    weekends = 0
    weekdays = 0
    for day, weekday in calendar.Calendar().itermonthdays2(year, month_number):
        if day == 0:
            continue
        if weekday >= 5:
            weekends += 1
        else:
            weekdays += 1
    return weekends, weekdays


def home(request):
    months_data = [
        (month, months_int[month]) for month in month_list.keys()
    ]
    html = render_to_string(
        "challenges/Challenges_Home.html",
        {"months_data": months_data},
    )
    return HttpResponse(html)


def monthly_challenge(request, month):
    current_year = date.today().year
    try:
        month_number = months_int[month]
        weekend_days, weekday_days = _month_week_breakdown(current_year, month_number)
        return render(
            request,
            "challenges/Monthly_Details.html",
            {
                "challenge_title": month_list[month],
                "challenge_text": f"This month is {month_list[month]}",
                "month_int": month_number,
                "current_year": current_year,
                "weekend_days": weekend_days,
                "weekday_days": weekday_days,
                "total_days": weekend_days + weekday_days,
            },
        )
    except KeyError:
        """
        response_data=render_to_string("404.html")
        return Http404(response_data)
        """
        raise Http404()
