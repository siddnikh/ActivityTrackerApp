export const sampleItems = [
    {
      id: '1',
      name: 'Push-ups',
      icon: 'fitness',
      reminder: true,
      reminderTime: new Date(2023, 5, 15, 9, 0), // 9:00 AM
      counts: [
        { date: '2023-06-01', count: 20 },
        { date: '2023-06-02', count: 25 },
        { date: '2023-06-03', count: 30 },
        { date: '2023-06-04', count: 20 },
        { date: '2023-06-05', count: 35 },
      ],
    },
    {
      id: '2',
      name: 'Water Intake',
      icon: 'water',
      reminder: true,
      reminderTime: new Date(2023, 5, 15, 12, 0), // 12:00 PM
      counts: [
        { date: '2023-06-01', count: 6 },
        { date: '2023-06-02', count: 8 },
        { date: '2023-06-03', count: 7 },
        { date: '2023-06-04', count: 8 },
        { date: '2023-06-05', count: 9 },
      ],
    },
    {
      id: '3',
      name: 'Reading',
      icon: 'book',
      reminder: false,
      reminderTime: null,
      counts: [
        { date: '2023-06-01', count: 30 },
        { date: '2023-06-02', count: 45 },
        { date: '2023-06-03', count: 60 },
        { date: '2023-06-04', count: 30 },
        { date: '2023-06-05', count: 45 },
      ],
    },
  ];