var mockData = {
  listPlanet: function () {
    return Promise.resolve([
      {
        label: 'Mercury',
        value: 'Mercury',
      },
      {
        label: 'Venus',
        value: 'Venus',
      },
      {
        label: 'Earth',
        value: 'Earth',
      },
      {
        label: 'Mars',
        value: 'Mars',
      },
      {
        label: 'Saturn',
        value: 'Saturn',
      },
      {
        label: 'Jupiter',
        value: 'Jupiter',
      },
      {
        label: 'Uranus',
        value: 'Uranus',
      },
      {
        label: 'Neptune',
        value: 'Neptune',
      },
      {
        label: 'Pluto',
        value: 'Pluto',
      },
    ])
  },
  listDay() {
    return Promise.resolve([
      {
        name: '7 day',
        value: 7,
      },
      {
        name: '23 day',
        value: 23,
      },
      {
        name: '36 day',
        value: 36,
      },
    ])
  },
}
